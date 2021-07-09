import { getStored, setStored } from "../abstraction/store"

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
    setStored("groups", newGroups);
}

/**
 * Delete a group from storage 
 * @param {number} id The id of the group to be deleted
 */
export async function deleteGroup(id: number) {
    let newGroups = (await readGroups()).filter((group) => group.id != id);
    setStored("groups", newGroups);
}