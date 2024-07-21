export interface IMeal {
    appetizers: string[],
    drinks: string[],
    entrees: string[],
    sides: string[],
    desserts: string[]
}

export type DishKey = keyof IMeal;

export interface IDailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

export type MealTypeKey = keyof IDailyMeals;

export interface IMealPlanner {
    monday: DailyMeals,
    tuesday: DailyMeals,
    wednesday: DailyMeals,
    thursday: DailyMeals,
    friday: DailyMeals,
    saturday: DailyMeals,
    sunday: DailyMeals
}

export type DayKey = keyof IMealPlanner;

export interface IMealOptions {
    day?: DayKey,
    time?: MealTypeKey,
    mealType?: DishKey
}