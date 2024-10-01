import { IMeal } from "../../types";

/**
 * Model to represent an individual meal and dishes comprising it.
 * 
 * @remarks
 * The usage of array of strings accounts for a couple scenarios: a meal will be for large family meal (e.g., Thanksgiving) and when planning for multiple people.
 */
export default class Meal implements IMeal {
    public dishes: {
        appetizers: string[],
        drinks: string[],
        entrees: string[],
        sides: string[],
        desserts: string[]
    };

    constructor() {
        this.dishes = {
            appetizers: [],
            drinks: [],
            entrees: [],
            sides: [],
            desserts: []
        };
    }
}
