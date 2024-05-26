/**
 * Interface for organizing data about a given Capsule.
 * @interface CapsuleData
 * @member {string} title title of the given Capsule.
 * @member {Date} createdAt date of capsule creation.
 * @member {string} unlockDate date of capsule unlock.
 * @member {string} id id of the capsule, optional.
 * @member {string} creator creator of the capsule, optional.
 * @member {number | string} likeNumber the number of likes the capsule has, optional.
 * @member {number | string} commentNumber the number of commeents the capsule has, optional.
 */
export interface CapsuleData {
    title: string;
    createdAt: Date;
    unlockDate: string;
    id?: string;
    creator?: string;
    likeNumber?: number | string;
    commentNumber?: number | string;
    isPublic?: boolean;
}

/**
 * Converts a given date to dd/mm/yyyy format.
 * @param {string | Date | undefined} date the date to convert to en-GB format (dd/mm/yyyy).
 * If date is undefined, will return an empty string!
 * @returns a new, properly formatted Date object.
 * @error Will throw an error if input {date} is not of type Date or string.
 */
export function convertDate(date: string | Date | undefined) {
    if (typeof date == "undefined") {
        return "";
    }
    if (date instanceof Date) {
        return new Date(date).toLocaleDateString("en-GB");
    } else if (typeof date == "string") {
        return new Date(date).toLocaleDateString("en-GB");
    } else {
        throw new Error(
            `convertDate requires input of type 'Date' or 'string', not: \n ${typeof date}`
        );
    }
}

/**
 * Reeturns whether an object or array is empty.
 * @param obj Object or array to check against.
 * @returns {boolean} *true* if the object or array is empty. *false* if the object or array is not empty.
 */
export function isEmpty(obj: any): boolean {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    } else if (typeof obj === "object" && obj !== null) {
        return Object.keys(obj).length === 0;
    } else {
        throw new Error(
            "isEmpty must be called with either an Array or a (non-null) Object"
        );
    }
}

/**
 * Tabulates whether or not a capsule should be considered "locked" or "unlocked" on the frontend display by comparing its unlockDate (passed in as parameter 'date') to the current date
 * @param {string | Date} date the date of the capsule to check against.
 * @returns {boolean} Whether the capsule, given the unlock date information, should vbe registered in the front end as locked or unlocked.
 */
export function isUnlocked(date: string | Date): boolean {
    const currentDate = new Date(); // Get the current date
    return !(new Date(date) <= currentDate);
}

/**
 *
 * @param {T[]} arr Array of objects to sort.
 * @param {key} fieldKey the field to check against within the object, for the purpose of sorting.
 * @returns T[] sorted array of the objects.
 */
export function sortObjectByField(arr: CapsuleData[], fieldKey: keyof CapsuleData): CapsuleData[] {
    return arr.slice().sort((a, b) => {
        const fieldA = a[fieldKey];
        const fieldB = b[fieldKey];

        if (typeof fieldA === "string" && typeof fieldB === "string") {
            return fieldA.localeCompare(fieldB);
        } else if (typeof fieldA === "number" && typeof fieldB === "number") {
            return fieldB - fieldA;
        } else if (fieldA instanceof Date && fieldB instanceof Date) {
            return fieldB.getTime() - fieldA.getTime();
        } else {
            return 0;
        }
    });
}

/**
 *
 * @param {CapsuleData[]} objects the array of capsules to filter.
 * @param {string} filterType whether to filter capsules to only include those which are locked, or only those which are unlocked.
 * @returns CapsuleData[] array of the capsules filtered for lock or unlock status, respectively.
 */
export function filterCapsulesByLockStatus(
    objects: CapsuleData[],
    filterType: "locked" | "unlocked"
): CapsuleData[] {
    const currentDate = new Date(); // Get the current date
    if (filterType === "unlocked") {
        // Filter out objects with an unlockDate after the current date
        return objects.filter((obj) => new Date(obj.unlockDate) <= currentDate);
    } else if (filterType === "locked") {
        // Filter out objects with an unlockDate before or equal to the current date
        return objects.filter((obj) => new Date(obj.unlockDate) > currentDate);
    } else {
        // Return original array if filterType is neither "locked" nor "unlocked"
        return objects;
    }
}

/**
 * Abbreviates text longer thgan a given length by cutting off the said text and adding a "..." in its stead.
 * @param {number} length The amount of characters to have before abbreviation
 * @param {string} text The text to abbreviate.
 * @returns string abbreviated text.
 */
export function abbreviateText(length: number, text: string): string {
    if (text.length > 25) {
        let output;
        output = text.slice(0, 23);
        output = output.concat("...");
        return output;
    } else {
        return text;
    }
}
