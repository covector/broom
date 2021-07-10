import { closeTabsInGroup, createTabs, getGroups, groupTabs } from "../abstraction/tabs";
import { readGroups, writeGroup } from "./groups_store";

/**
 * Check whether a group is toggled on
 * @param id The id of the group to be checked
 * @returns Whether the group is already toggled on
 */
async function groupIsOn(id: number): Promise<boolean> {
    let presentGroups = await getGroups();
    for (let i = 0; i < presentGroups.length; i++) {
        if (presentGroups[i].id == id) { return true; }
    }
    return false;
}

/**
 * Toggle a group off. Will have no effect if group doesn't exist or is already toggled
 * @param id The id of the group to be toggled on
 */
export async function toggleGroupOn(id: number) {
    let groups = (await readGroups()).filter((group) => group.id == id);
    // No such group
    if (!groups.length) { return; }
    // Already toggled on
    if (groupIsOn(id)) { return; }
    // Create group
    let group = groups[0];
    let tabIds = (await createTabs(group.urls)).map((tab) => tab.id);
    let groupId = await groupTabs(tabIds);
    // Update id
    group.id = groupId;
    await writeGroup(group); 
}

/**
 * Toggle a group off. Will have no effect if group doesn't exist or is not toggled on
 * @param id The id of the group to be toggled off
 */
export async function toggleGroupOff(id: number) {
    let groups = (await readGroups()).filter((group) => group.id == id);
    // No such group
    if (!groups.length) { return; }
    // Already toggled off
    if (!groupIsOn(id)) { return; }
    // Remove group
    await closeTabsInGroup(id);
}

/**
 * Toggle a group. Will have no effect if group doesn't exist
 * @param id The id of the group to be toggled
 */
export async function toggleGroup(id: number) {
    groupIsOn(id) ? await toggleGroupOff(id) : await toggleGroupOn(id);
}