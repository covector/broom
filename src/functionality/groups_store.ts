import { getStored, setStored } from "../abstraction/store"
import { getGroups, getTabsInGroup } from "../abstraction/tabs";

export interface StoredGroup {
    id: number;
    color: chrome.tabGroups.ColorEnum;
    title: string;
    urls: string[];
    favIconUrl: string;
}

/**
 * Reading all the registered groups
 * @return {Promise<Array<StoredGroup>>} Resolve to the array of registered groups
 */
export async function readRegistered(): Promise<StoredGroup[]> {
    return await getStored("groups", []) as StoredGroup[]; 
}

/**
 * Reading all the unregistered groups
 * @returns {Promise<chrome.tabGroups.TabGroup[]>} Resolve to the array of unregistered groups
 */
export async function readUnregistered(): Promise<chrome.tabGroups.TabGroup[]> {
    let allGroups = await getGroups();
    let registeredGroups = await readRegistered();
    return allGroups.filter((group) => !registeredGroups.some((registered) => registered.id == group.id));
}

/**
 * Create or replace a group in the storage
 * @param {StoredGroup} newGroup The group to be created or replaced
 */
export async function writeGroup(newGroup: StoredGroup) {
    let registered = await readRegistered();
    let overwrite = false;
    for (let i = 0; i < registered.length; i++) {
        if (registered[i].id == newGroup.id) {
            // fallback to original if none in new
            if (!newGroup.favIconUrl) { newGroup.favIconUrl = registered[i].favIconUrl; }
            registered[i] = newGroup;
            overwrite = true;
            break;
        }
    }
    if (!overwrite) { registered.push(newGroup); }
    await setStored("groups", registered);
}

/**
 * Register an unregistered group or modify a registered group
 * @param id The id of the target group
 */
export async function registerGroup(id: number) {
    let group = await chrome.tabGroups.get(id);
    let tabs = await getTabsInGroup(id);
    let urls = tabs.map((tab) => tab.url);
    let tabsWithFavIcon = tabs.filter((tab) => tab.favIconUrl);
    let autoIcon = tabsWithFavIcon.length ? tabsWithFavIcon[0].favIconUrl : "";
    let manualIcon = urls[0];
    let favIconUrl = manualIcon.search(/\.(svg)|(png)|(ico)$/) >= 0 ? manualIcon : autoIcon;
    let info: StoredGroup = {
        id,
        color: group.color,
        title: group.title,
        urls,
        favIconUrl
    }
    await writeGroup(info);
}

/**
 * Unregister a group
 * @param {number} id The id of the group to be unregistered
 */
export async function unregisterGroup(id: number) {
    let newGroups = (await readRegistered()).filter((group) => group.id != id);
    await setStored("groups", newGroups);
}