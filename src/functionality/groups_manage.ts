import { setStored } from "../abstraction/store";
import { closeTabsInGroup, createTabs, getGroups, groupTabs } from "../abstraction/tabs";
import { readRegistered, registerGroup, StoredGroup } from "./groups_store";

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
 * Make sure that no registered group will conflict with a given id
 * @param avoidId The group id that all the registered group must avoid
 * @return {Promise<StoredGroup[]>} The conflict-less registered gorups
 */
async function conflictResolve(avoidId: number) {
    let groups = await readRegistered();
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
    return groups;
}

/**
 * Toggle a group off. Will have no effect if group doesn't exist or is already toggled
 * @param id The id of the group to be toggled on
 * @return {Promise<number>} The new id of the group toggled on
 */
export async function toggleGroupOn(id: number): Promise<number> {
    let registered = await readRegistered();
    let index = -1;
    for (let i = 0; i < registered.length; i++) {
        if (registered[i].id == id) {
            index = i;
            break;
        }
    }
    // No such group
    if (index < 0) { return; }
    // Already toggled on
    if (await groupIsOn(id)) { return; }
    // Create group
    let group = registered[index];
    let tabIds = (await createTabs(group.urls)).map((tab) => tab.id);
    let groupId = await groupTabs(tabIds, group.title, group.color);
    // Update id
    let conflictless = await conflictResolve(groupId);
    conflictless[index].id = groupId;
    await setStored("groups", conflictless);
    return groupId;
}

/**
 * Toggle a group off. Will have no effect if group doesn't exist or is not toggled on
 * @param id The id of the group to be toggled off
 * @return {Promise<number>} The new id of the group toggled off
 */
export async function toggleGroupOff(id: number): Promise<number> {
    let groups = (await readRegistered()).filter((group) => group.id == id);
    // No such group
    if (!groups.length) { return; }
    // Already toggled off
    if (!(await groupIsOn(id))) { return; }
    // Update group
    await registerGroup(id);
    // Remove group
    await closeTabsInGroup(id);
    return id;
}

/**
 * Toggle a group. Will have no effect if group doesn't exist
 * @param id The id of the group to be toggled
 * @return {Promise<number>} The new id of the group toggled
 */
export async function toggleGroup(id: number): Promise<number> {
    return (await groupIsOn(id)) ? await toggleGroupOff(id) : await toggleGroupOn(id);
}