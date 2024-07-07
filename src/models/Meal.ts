/**
 * Model to represent an individual meal
 * 
 * @remarks
 * The usage of array of strings accounts for a couple scenarios: a meal will be for large family meal (e.g., Thanksgiving) and when planning for multiple people.
 */
export default interface Meal {
    appetizers: string[],
    entrees: string[],
    sides: string[],
    desserts: string[]
}

/**
 * Meta data about an individual meal.
 */
export interface MetaMeal {
    numAppetizers: number,
    numEntrees: number,
    numSides: number,
    desserts: number
}