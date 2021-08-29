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
    let newGroups = (await readRegistered()).filter((group) => {
        if (group.id == newGroup.id) {
            // fallback to original if none in new
            if (!newGroup.favIconUrl) { newGroup.favIconUrl = group.favIconUrl; }
            // delete original registered group
            return false;
        }
        // keep other registered groups
        return true;
    });
    newGroups.push(newGroup);
    await setStored("groups", newGroups);
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
    let favIconUrl = tabsWithFavIcon.length ? tabsWithFavIcon[0].favIconUrl : "";
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