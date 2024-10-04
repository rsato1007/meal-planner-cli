import MealService from '../services/MealService';
import MealPlannerService from '../services/MealPlanner';
import DailyMealsService from '../services/DailyMealService';

import { wait } from './misc.js';
import { getValidChoice } from './inputCli';

import { 
    IDailyMeals,
    IMealOptions,
    ICompletedOptions,
    DayKey,
    MealTypeKey
} from '../../types/index.js';

const CHOICES: Record<choiceKey, { query: string, choices: string[] }> = {
    day: {
        query: "What day did you want to add the dish to? Select a number from the following options: ",
        choices: MealPlannerService.days
    },
    time: {
        query: "Is this a dish for breakfast, lunch, or dinner? Select a number from the following options: ",
        choices: DailyMealsService.mealTimes
    },
    mealType: {
        query: "What type of meal am I adding? Select a number from the following options: ",
        choices: MealService.getTypes()
    }
};

type choiceKey = "day" | "time" | "mealType";

/**
 * Reviews input to ensure it's not invalid.
 * @param obj - selected choice for each option (day, time, and meal type)
 * @returns - updated object for options selected with invalid input
 * @remarks - This will most likely by removed down the road as we move towards numbered options and removing flags.
 */
export const validateOptionsInput = async (obj: IMealOptions): Promise<IMealOptions> => {
    let cleanedObj: IMealOptions = {};

    cleanedObj = translateInput(obj);

    for (const key of Object.keys(cleanedObj) as choiceKey[]) {
        const value = cleanedObj[key];
        if (!(value && CHOICES[key].choices.includes(value))) {
            console.log("INVALID INPUT FOR: ", key);
            await wait(2000);
            const validChoice = await getValidChoice(CHOICES[key]);
            /*
                The following line of code is how we avoid TypeScript's complier issue
                with cleanedObj[key] being possibly undefined despite our if statement
                verifying it's not undefined.
            */
            Object.defineProperty(cleanedObj, key, {value: validChoice})
        }
    }

    return cleanedObj;
}

/**
 * Recieves an options object for flags selected and adds others not added.
 * This ensures no issues when adding a meal to the meal planner.
 * 
 * @remarks
 * - We need to ensure user input is legitimate and maybe work on making the UI a little bit better.
 * - This is where we'll add our code that reads a settings/config file for preselected choices.
 */
export const getMissingOptions = async (options: any): Promise<ICompletedOptions> => {

    let completedOptions = Object.assign({}, options);
    completedOptions = translateInput(completedOptions);
    if (!completedOptions.hasOwnProperty("day")) {
        completedOptions.day = await getValidChoice(CHOICES["day"]);
    }
    if (!completedOptions.hasOwnProperty("time")) {
        completedOptions.time = await getValidChoice(CHOICES["time"]);
    }
    if (!completedOptions.hasOwnProperty("mealType")) {
        completedOptions['mealType'] = await getValidChoice(CHOICES["mealType"]);
    }

    return completedOptions;
}

export const removeMealFromDay = (meals: DailyMealsService, dish: string) => {
    let mealRemoved = false;
    // For loops play nicer with break statements in my experience.
    for (let i = 0; i < DailyMealsService.mealTimes.length; i++) {
        const time = DailyMealsService.mealTimes[i];
        const result = meals.getDishesByTime(time as keyof IDailyMeals).removeDish(dish);
        if (result) {
            mealRemoved = true;
            break;
        }
    }
    return mealRemoved;
}

/**
 * @remarks
 * - Eventually we'll remove the flags from our CLI and this will be obsolete 
 */
export const translateInput = (options: IMealOptions) => {
    let updatedOptions: IMealOptions = {};
    const mapItems = (arr: any) => {
        return arr.reduce((acc: any, item: any) => {
            item.abbr.forEach((abbr: any) => {
                acc[abbr] = item.full;
            })
            return acc;
        }, {});
    }

    const dayOptions = [
        { full: 'monday',     abbr: ['monday', 'mon', 'mo', 'm'] },
        { full: 'tuesday',    abbr: ['tuesday', 'tue', 'tu', 't'] },
        { full: 'wednesday',  abbr: ['wednesday', 'wed', 'we', 'w'] },
        { full: 'thursday',   abbr: ['thursday', 'thu', 'th', 'h'] },
        { full: 'friday',     abbr: ['friday', 'fri', 'fr', 'f'] },
        { full: 'saturday',   abbr: ['saturday', 'sat', 'sa', 's'] },
        { full: 'sunday',     abbr: ['sunday', 'sun', 'su', 'n'] }
    ]
    const timeOptions = [
        { full: 'breakfast',  abbr: ['breakfast', 'brkfst', 'brk', 'br', 'b'] },
        { full: 'lunch',      abbr: ['lunch', 'lun', 'ln', 'l'] },
        { full: 'dinner',     abbr: ['dinner', 'supper', 'din', 'sup', 'dn', 'sp', 'd'] }
    ]
    const typeOptions = [
        { full: 'appetizers', abbr: ['appetizers', 'app', 'starters', 'strt', 'st', 'ap', 'a'] },
        { full: 'drinks',     abbr: ['drinks', 'drink', 'bev', 'drk', 'bv', 'dr', 'b'] },
        { full: 'entrees',    abbr: ['entrees', 'mains', 'entr', 'main', 'mn', 'en', 'e'] },
        { full: 'sides',      abbr: ['sides', 'side', 'sds', 'sd', 's'] },
        { full: 'desserts',   abbr: ['desserts', 'dessert', 'sweets', 'sweet', 'dsrt', 'dess', 'dss', 'ds', 'd'] }
    ]

    // Checking for mixture of lowercase and uppercase provides better UX.
    if (options.hasOwnProperty('day') && typeof options.day === 'string') {
        const normalizedDay = options.day.toLowerCase();
        const dayMapping = mapItems(dayOptions);
        updatedOptions.day = dayMapping[normalizedDay] || options.day;
    }
    if (options.hasOwnProperty('time') && typeof options.time === 'string') {
        const normalizedTime = options.time.toLowerCase();
        const timeMapping = mapItems(timeOptions);
        updatedOptions.time = timeMapping[normalizedTime] || options.time;
    }
    if (options.hasOwnProperty('mealType') && typeof options.mealType === 'string') {
        const normalizedType = options.mealType.toLowerCase();
        const typeMapping = mapItems(typeOptions);
        updatedOptions.mealType = typeMapping[normalizedType] || options.mealType;
    }

    return updatedOptions;
}

export const findDishByAll = (dish: string, planner: MealPlannerService): MealService | undefined => {
    let days = MealPlannerService.days;
    let times = DailyMealsService.mealTimes;
    for (const day of days) {
        const DailyMeals = planner.getMealsByDay(day as DayKey);
        for (const time of times) {
            const DishesForTime = DailyMeals.getDishesByTime(time as MealTypeKey);
            if (DishesForTime.doesDishExist(dish)) {
                return DishesForTime;
            };
        }
    }

    return;
}

export const findDishByDay = (dish: string, mealsInDay: DailyMealsService): MealService | undefined => {
    let times = DailyMealsService.mealTimes;
    for (const time of times) {
        const DishesForTime = mealsInDay.getDishesByTime(time as MealTypeKey);
        if (DishesForTime.doesDishExist(dish)) {
            return DishesForTime;
        };
    }

    return;
}

export const findDishByTime = (data: {dish: string, time: MealTypeKey}, planner: MealPlannerService): MealService | undefined => {
    let days = MealPlannerService.days;
    for (const day of days) {
        const DishesForTime = planner.getMealsByDay(day as DayKey).getDishesByTime(data.time);
        if (DishesForTime.doesDishExist(data.dish)) {
            return DishesForTime;
        };
    }
    return;
}