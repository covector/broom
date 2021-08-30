import { setStored } from "../abstraction/store";
import { readRegistered, StoredGroup } from "./groups_store";

interface StoredGroupWithoutId {
    color: chrome.tabGroups.ColorEnum;
    title: string;
    urls: string[];
    favIconUrl: string;
}

/**
 * Export all data as a string
 * @return {Promise<string>} Stringified data
 */
export async function exportData(): Promise<string> {
    let registered = await readRegistered();
    let registeredWithoutId: StoredGroupWithoutId[] = registered.map(({ id, ...group }) => group);
    return JSON.stringify(registeredWithoutId);
}

/**
 * Import data
 * @param {string} stringified data
 * @return {Promise<boolean>} Whether the import is successful
 */
export async function importData(stringified: string): Promise<boolean> {
    let registeredWithoutId: StoredGroupWithoutId[];
    try {
        registeredWithoutId = JSON.parse(stringified);
    } catch(e) {
        return false;
    }
    // Validate data
    for (let i = 0; i < registeredWithoutId.length; i++) {
        let group = registeredWithoutId[i];
        if (
            !["grey", "blue", "red", "yellow", "green", "pink", "purple", "cyan"].includes(group.color) ||
            typeof group.title !== "string" ||
            !group.urls.every((url) => typeof url === "string") ||
            typeof group.favIconUrl !== "string"
        ) {
            return false;
        }
    }
    // Overwrite data
    let registered: StoredGroup[] = registeredWithoutId.map(({ color, title, urls, favIconUrl }, index) => ({ color, title, urls, favIconUrl, id: index }));
    await setStored("groups", registered);
    return true;
}
