import { question, offerOptions, getValidChoice } from "../../utils/inputCli";
import { wait } from "../../utils/misc";
import { addDish } from "./addDish";
import MealPlannerService from "src/services/MealPlanner";
import { removeDish } from "./removeDish";
import { showDishes } from "./showDishes";
import updateDish from "./updateDish";
import { addManyDishes } from "./addManyDishes";

export const startInteractive = async (planner: MealPlannerService) => {
    let runProgram = true;

    console.log("Welcome to the meal planner main menu.");

    await wait(1500);

    while (runProgram) {
        const option = await getValidChoice({
            query: "Main Menu:",
            choices: [
                "Add a dish",
                "Add multiple dishes",
                "Remove a dish",
                "Remove many dishes",
                "Update a dish",
                "Show planned dishes",
                "Exit"
            ]
        });

        // Switch case makes each option easier to distinguish and relatively more scalable.
        switch (option){
            case "Add a dish":
                console.clear();
                const dishName = await question("What's the name of dish you wish to add? ");
                await addDish(dishName, {}, planner);
                break;
            case "Add multiple dishes":
                console.clear();
                const dishes = await question("Please type out the name of the dishes. \nYou'll separate by comma (e.g, Tacos,Nachos, etc.): ");
                console.log("Next we'll offer options for where these dishes should go.\nFor example if you select a day, all dishes will go on that day, otherwise leave them blank.");
                await wait(1500);
                const mulitpleDishOptions = await offerOptions();
                await addManyDishes(dishes, mulitpleDishOptions, planner);
                break;
            case "Remove a dish":
                console.clear();
                const dishToRemove = await question("What's the name of dish you wish to remove? ");
                const removeOptions = await offerOptions();
                await removeDish(dishToRemove, removeOptions, planner);
                await wait(1000);
                break;
            case "Remove many dishes":
                console.clear();
                // Insert code
                break;
            case "Update a dish":
                console.clear();
                const dishToUpdate = await question("What's the name of dish you wish to update? ");
                const newName = await question("What did you want to rename it to? ");
                const updateOptions = await offerOptions();
                await updateDish({cur: dishToUpdate, new: newName, options: updateOptions}, planner);
                await wait(1000);
                break;
            case "Show planned dishes":
                console.clear();
                const showOptions = await offerOptions();
                await showDishes(showOptions, planner);
                await question("Hit enter when you are ready to go back!");
                console.clear();
                break;
            case "Exit":
                console.log("Exiting Program");
                await wait(1500);
                runProgram = false;
                break;
            default:
                console.log("Invalid choice");
                await wait(1000);
                break;
        }
    }
}