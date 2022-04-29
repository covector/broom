/**
 * Get a value by giving its key in the sync storage
 * @param {string} key The key of the value to be retrieved
 * @param {?Object} def The object to be returned if the key is not defined
 * @return {Promise<object>} Resolve to the value retrieved
 */
function getSyncStored(key: string, def: any = undefined): Promise<any> {
    return new Promise((res) => {
        chrome.storage.sync.get(key, (object) => {
            let value = object[key];
            res(value === undefined ? def : value);
        });
    });
}

/**
 * Get a value by giving its key in the local storage
 * @param {string} key The key of the value to be retrieved
 * @param {?Object} def The object to be returned if the key is not defined
 * @return {Promise<object>} Resolve to the value retrieved
 */
 function getLocalStored(key: string, def: any = undefined): Promise<any> {
    return new Promise((res) => {
        chrome.storage.local.get(key, (object) => {
            let value = object[key];
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
 export async function setStored(key: string, value: Object, sync: boolean|undefined = undefined): Promise<boolean> {
    sync = sync == undefined ? (await getSyncStored(key)) !== undefined : sync;
    return new Promise((res) => {
        sync ?
        chrome.storage.sync.set({ [key]: value }, () => {
            res(true);
        }) :
        chrome.storage.local.set({ [key]: value }, () => {
            res(true);
        });
    });
}

/**
 * Get a value by giving its key in the storage
 * @param {string} key The key of the value to be retrieved
 * @return {Promise<object>} Resolve to the value retrieved
 */
export async function getStored(key: string, def: any = undefined): Promise<any> {
    const sync = await getSyncStored(key);
    if (sync !== undefined) { return sync; }
    return await getLocalStored(key, def);
}

/**
 * Clear all the values in the storage
 * @return {Promise<boolean} Resolve to true when finished
 */
export async function clearStored(): Promise<boolean> {
    return new Promise((res) => {
        chrome.storage.sync.clear(() => {
            chrome.storage.local.clear(() => {
                res(true);
            });
        });
    });
}