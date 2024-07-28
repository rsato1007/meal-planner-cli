export interface IMeal {
    dishes: {
        appetizers: string[],
        drinks: string[],
        entrees: string[],
        sides: string[],
        desserts: string[]
    }
}

export type DishKey = "appetizers" | "drinks" | "entrees" | "sides" | "desserts";

export interface IDailyMeals {
    breakfast: IMeal,
    lunch: IMeal,
    dinner: IMeal
}

export type MealTypeKey = "breakfast" | "lunch" | "dinner";

export interface IMealPlanner {
    monday: IDailyMeals,
    tuesday: IDailyMeals,
    wednesday: IDailyMeals,
    thursday: IDailyMeals,
    friday: IDailyMeals,
    saturday: IDailyMeals,
    sunday: IDailyMeals
}

export type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface IMealOptions {
    day?: DayKey,
    time?: MealTypeKey,
    mealType?: DishKey
}

export interface ICompletedOptions {
    day: DayKey,
    mealType: DishKey
}

export interface IUpdateDishData {
    cur: string,
    new: string,
    options: IMealOptions
} 