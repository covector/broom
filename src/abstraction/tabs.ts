/**
 * Create a new tab from a url
 * @param {string} url The url of the webpage the new tab will display
 * @param {?number=} windowId The id of the window to put the new tab in (null for current window)
 * @param {boolean=} active Make the newly created tab active
 * @return {Promise<chrome.tabs.Tab>} Resolve to the tab object of the newly created tab
 */
function createTab(url: string, windowId: number = null, active = false): Promise<chrome.tabs.Tab> {
    return chrome.tabs.create({url, windowId, active});
}

/**
 * Close one or more tabs
 * @param {number|Array<number>} tabIds The id(s) of the tab(s) to be closed
 */
 function closeTabs(tabIds: number | number[]): Promise<void> {
    // @ts-ignore: Union type as param of overloaded function
    return chrome.tabs.remove(tabIds);
}

/**
 * Create a new window cotaining an existing tab
 * @param {number} tabId The id of the tab to put in the new window
 * @return {Promise<chrome.windows.Window>} Resolve to the window object of the newly created window
 */
function createWindow(tabId): Promise<chrome.windows.Window> {
    return chrome.windows.create({state: "maximized", tabId});
}
