import { setStored } from "../abstraction/store";
import { closeTabsInGroup, createTabs, getGroups, groupTabs } from "../abstraction/tabs";
import { deleteGroup, readGroups, writeGroup } from "./groups_store";

/**
 * Check whether a group is toggled on
 * @param id The id of the group to be checked
 * @returns Whether the group is already toggled on
 */
export async function groupIsOn(id: number): Promise<boolean> {
    let presentGroups = await getGroups();
    for (let i = 0; i < presentGroups.length; i++) {
        if (presentGroups[i].id == id) { return true; }
    }
    return false;
}

/**
 * Make sure that no stored group will conflict with a given id
 * @param avoidId The group id that all the stored group must avoid
 */
async function conflictResolve(avoidId: number) {
    let groups = await readGroups();
    for (let i = 0; i < groups.length; i++) {
        let id = groups[i].id;
        while (true) {
            if (id == avoidId) {
                id++;
                continue;
            }
            for (let j = 0; j < groups.length; j++) {
                if (id == groups[j].id && i != j) {
                    id++;
                    continue;
                }
            }
            break;
        }
        groups[i].id = id;
    }
    await setStored("groups", groups);
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
    if (await groupIsOn(id)) { return; }
    // Create group
    let group = groups[0];
    let tabIds = (await createTabs(group.urls)).map((tab) => tab.id);
    let groupId = await groupTabs(tabIds, group.title, group.color);
    // Update id
    await deleteGroup(group.id);
    group.id = groupId;
    await conflictResolve(groupId);
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
    if (!(await groupIsOn(id))) { return; }
    // Remove group
    await closeTabsInGroup(id);
}

/**
 * Toggle a group. Will have no effect if group doesn't exist
 * @param id The id of the group to be toggled
 */
export async function toggleGroup(id: number) {
    (await groupIsOn(id)) ? await toggleGroupOff(id) : await toggleGroupOn(id);
}