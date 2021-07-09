/**
 * Get a value by giving its key in the sync storage
 * @param {string} key The key of the value to be retrieved
 * @param {Object} def The object to be returned if the key is not defined
 * @return {Promise<object>} Resolve to the value retrieved
 */
export function getStored(key: string, def: any): Promise<any> {
    return new Promise((res) => {
        chrome.storage.sync.get(key, ({ value }) => {
            res(value === undefined ? def : value);
        });
    });
}

/**
 * Set a value by giving its key in the sync storage
 * @param {string} key The key of the value to be set
 * @param {Object} value The value to be set to
 * @return {Promise<boolean} Resolve to true when finished
 */
export function setStored(key: string, value: Object): Promise<boolean> {
    return new Promise((res) => {
        chrome.storage.sync.set({ [key]: value }, () => {
            res(true);
        });
    });
}