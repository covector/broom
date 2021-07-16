import { getStored, setStored } from "../abstraction/store"
import { getTabsInGroup } from "../abstraction/tabs";

export interface StoredGroup {
    id: number,
    color: chrome.tabGroups.ColorEnum,
    title: string,
    urls: string[]
}

/**
 * Reading all the groups stored
 * @return {Promise<Array<StoredGroup>>} Resolve to the array of stored groups
 */
export async function readGroups(): Promise<StoredGroup[]> {
    return await getStored("groups", []) as StoredGroup[]; 
}

/**
 * Write a group to storage
 * @param {StoredGroup} newGroup The new group to be written 
 */
export async function writeGroup(newGroup: StoredGroup) {
    let newGroups = (await readGroups()).filter((group) => group.id != newGroup.id);
    newGroups.push(newGroup);
    await setStored("groups", newGroups);
}

/**
 * Add a group from a window to the storage
 * @param id The id of the group to be added to storage
 */
export async function addGroup(id: number) {
    let group = await chrome.tabGroups.get(id);
    let urls = (await getTabsInGroup(id)).map((tab) => tab.url);
    let info: StoredGroup = {
        id,
        color: group.color,
        title: group.title,
        urls
    }
    await writeGroup(info);
}

/**
 * Delete a group from storage 
 * @param {number} id The id of the group to be deleted
 */
export async function deleteGroup(id: number) {
    let newGroups = (await readGroups()).filter((group) => group.id != id);
    await setStored("groups", newGroups);
}