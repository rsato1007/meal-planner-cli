import { capitalizeFirst } from './primitiveDataUtils';
import MealService from '../services/MealService';
import MealPlannerService from '../services/MealPlanner';
import DailyMealsService from '../services/DailyMealService';

import { 
    IDailyMeals,
    IMealPlanner,
    DishKey
} from '../../types/index.js';

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