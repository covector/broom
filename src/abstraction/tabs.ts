/**
 * Create a new tab(s) from a url
 * @param {string | Array<string>} urls The url(s) of the webpage the new tab(s) will display
 * @param {?number} windowId The id of the window to put the new tab in (default to current window)
 * @return {Promise<chrome.tabs.Tab | Promise<chrome.tabs.Tab>[]>} Resolve to the tab object(s) of the newly created tab(s)
 */
export async function createTabs(urls: string | string[], windowId?: number): Promise<chrome.tabs.Tab | Promise<chrome.tabs.Tab>[]> {
    if (Array.isArray(urls)) {
        return urls.map(async (url) => {
            return await chrome.tabs.create({url, windowId, active: false});
        });
    }
    else {
        return await chrome.tabs.create({url: urls, windowId, active: false});
    }
}

/**
 * Close one or more tabs
 * @param {number | Array<number>} tabIds The id(s) of the tab(s) to be closed
 */
export async function closeTabs(tabIds: number | number[]) {
    // @ts-ignore: Union type as param of overloaded function
    await chrome.tabs.remove(tabIds);
}

/**
 * Create a new window cotaining an existing tab
 * @param {number} tabId The id of the tab to put in the new window
 * @return {Promise<chrome.windows.Window>} Resolve to the window object of the newly created window
 */
export function createWindow(tabId): Promise<chrome.windows.Window> {
    return chrome.windows.create({state: "maximized", tabId});
}

/**
 * Group tab(s) into a tabgroup
 * @param {number | Array<number} tabIds The id(s) of the tab(s) to be grouped
 * @param {?string} title The name of the group
 * @param {?chrome.tabGroups.ColorEnum} color The color of the group
 * @param {?number} windowId The id of the window to put the group in (default to current window)
 * @return {Promise<number>} The id of the group created
 */
export async function groupTabs(tabIds: number | number[], title?: string, color?: chrome.tabGroups.ColorEnum, windowId?: number): Promise<number> {
    let groupId = await chrome.tabs.group({createProperties: {windowId}, tabIds});
    await chrome.tabGroups.update(groupId, {title, color});
    return groupId;
}

/**
 * Get the tabs in a specific tabgroup
 * @param {number} groupId The id of the group to get all the tabs from
 * @return {Promise<Array<chrome.tabs.Tab>>} The tabs in the group
 */
export function getTabsInGroup(groupId: number): Promise<chrome.tabs.Tab[]> {
    return chrome.tabs.query({groupId});
}

/**
 * Close all tabs in a specific group
 * @param {number} groupId The id of the group to be closed
 */
export async function closeTabsInGroup(groupId: number) {
    let tabIds = (await getTabsInGroup(groupId)).map((tab) => {
        return tab.id;
    });
    await closeTabs(tabIds);
}