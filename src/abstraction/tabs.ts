/**
 * Create a new tabs from a urls
 * @param {Array<string>} urls The urls of the webpage the new tabs will display
 * @param {?number} windowId The id of the window to put the new tab in (default to current window)
 * @return {Promise<chrome.tabs.Tab[]>} Resolve to the tab objects of the newly created tabs
 */
export async function createTabs(urls: string[], windowId?: number): Promise<chrome.tabs.Tab[]> {
    return await Promise.all(urls.map(async (url) => {
        return await chrome.tabs.create({url, windowId, active: false});
    }));
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
export function createWindow(tabId: number): Promise<chrome.windows.Window> {
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
 * Get all present groups (both registered and unregistered present)
 * @returns All the groups in all windows
 */
export function getGroups(): Promise<chrome.tabGroups.TabGroup[]> {
    return chrome.tabGroups.query({});
}

/**
 * Get the tabs in a specific tabgroup
 * @param {number} groupId The id of the group to get all the tabs from
 * @return {Promise<Array<chrome.tabs.Tab>>} The tabs in the group
 */
export async function getTabsInGroup(groupId: number): Promise<chrome.tabs.Tab[]> {
    // chrome.tabs.query({groupId}) doesn't work idk why
    return (await chrome.tabs.query({})).filter((tab) => tab.groupId == groupId);
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