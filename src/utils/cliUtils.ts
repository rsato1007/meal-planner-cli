import readline from 'node:readline';

import MealService from '../services/MealService.js';
import MealPlannerService from '../services/MealPlanner.js';
import DailyMealsService from '../services/DailyMealService.js';
import { wait } from './misc.js';
import { capitalizeFirst } from './primitiveDataUtils.js';

import { 
    IDailyMeals,
    IMealOptions,
    IMealPlanner,
    ICompletedOptions,
    DayKey,
    MealTypeKey,
    DishKey
} from '../../types/index.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query: string): Promise<string> => new Promise((resolve) => {
    rl.question(query, (answer) => {
        resolve(answer);
    });
});

const CHOICES: Record<choiceKey, { query: string, choices: string[] }> = {
    day: {
        query: "What day did you want to add the dish to? ",
        choices: MealPlannerService.days
    },
    time: {
        query: "Is this a dish for breakfast, lunch, or dinner? ",
        choices: DailyMealsService.mealTimes
    },
    mealType: {
        query: "What type of meal am I adding? ",
        choices: MealService.getTypes()
    }
};

type choiceKey = "day" | "time" | "mealType";

/**
 * Reviews input to ensure it's not invalid.
 * @param obj - selected choice for each option (day, time, and meal type)
 * @returns - updated object for options selected with invalid input
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
 * If a day/time/meal-type choice is invalid or missing, this function ensures we receive.
 * @param obj - see getMissingOptions for object structure.
 * @returns - Promise-based string representing choice we want.
 */
const getValidChoice = async (obj: any): Promise<DishKey | MealTypeKey | DayKey> => {
    let validChoice = false;
    let res = "";
    while (!validChoice) {
        res = await question(obj.query);
        if (obj.choices.includes(res)) {
            validChoice = true;
        } else {
            console.log("INVALID CHOICE");
        }
    }

    return res as DishKey | MealTypeKey | DayKey;
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

    rl.close();

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
 * Displays a console log with requested data.
 */
export const formatMealData = (data: MealPlannerService | DailyMealsService | MealService | string[]) => {
    // First we have to determine what data was provded
    if (data instanceof MealPlannerService) {
        const days = MealPlannerService.days;
        days.forEach((day) => {
            console.log("------------------------");
            console.log(`Planned Meals for ${capitalizeFirst(day)}: `);
            console.log("------------------------");
            formatMealData(data.getMealsByDay(day as keyof IMealPlanner));
        })
    } else if (data instanceof DailyMealsService) {
        DailyMealsService.mealTimes.forEach((time: string) => {
            const formattedString = time.replace(" MealService", "");
            const dishes = data.getDishesByTime(time as keyof IDailyMeals)["meal"]["dishes"];
            console.log(`Planned ${capitalizeFirst(formattedString)} Items: `)
            for (const key in dishes) {
                if (dishes[key as DishKey].length > 0) {
                    console.log(`   ${capitalizeFirst(key)}: ${dishes[key as DishKey].join(", ")}`);
                }
            }
        })
    } else if (data instanceof MealService) {
        MealService.getTypes().forEach((mealType) => {
            if (data.getDishesByDishType(mealType as DishKey).length > 0) {
                console.log(`Planned ${capitalizeFirst(mealType)} Items: ${data.getDishesByDishType(mealType as DishKey).join(", ")}`);
            }
        })
    } else if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
        console.log(`Planned Dishes: ${data.join(", ")}`);
    }
}

/**
 * @remarks
 * - Look at refactoring types for better use of TypeScript's system.
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
        { full: 'monday',     abbr: ['mon', 'mo', 'm'] },
        { full: 'tuesday',    abbr: ['tue', 'tu', 't'] },
        { full: 'wednesday',  abbr: ['wed', 'we', 'w'] },
        { full: 'thursday',   abbr: ['thu', 'th', 'h'] },
        { full: 'friday',     abbr: ['fri', 'fr', 'f'] },
        { full: 'saturday',   abbr: ['sat', 'sa', 's'] },
        { full: 'sunday',     abbr: ['sun', 'su', 'n'] }
    ]
    const timeOptions = [
        { full: 'breakfast',  abbr: ['brkfst', 'brk', 'br', 'b'] },
        { full: 'lunch',      abbr: ['lun', 'ln', 'l'] },
        { full: 'dinner',     abbr: ['supper', 'din', 'sup', 'dn', 'sp', 'd'] }
    ]
    const typeOptions = [
        { full: 'appetizers', abbr: ['app', 'starters', 'strt', 'st', 'ap', 'a'] },
        { full: 'drinks',     abbr: ['drink', 'bev', 'drk', 'bv', 'dr', 'b'] },
        { full: 'entrees',    abbr: ['mains', 'entr', 'main', 'mn', 'en', 'e'] },
        { full: 'sides',      abbr: ['side', 'sds', 'sd', 's'] },
        { full: 'desserts',   abbr: ['dessert', 'sweets', 'sweet', 'dsrt', 'dess', 'dss', 'ds', 'd'] }
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