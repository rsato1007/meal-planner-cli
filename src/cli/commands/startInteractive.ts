import { question, offerOptions, getValidChoice } from "@utils/inputCli";
import { wait } from "@utils/misc";
import { addDish } from "./addDish";
import MealPlannerService from "src/services/MealPlanner";

export const startInteractive = async (planner: MealPlannerService) => {
    // Use a while loop 
    let runProgram = true;

    console.log("Welcome to the meal planner main menu.")
    await wait(1500);
    while (runProgram) {
        const option = await getValidChoice({
            query: "Main Menu:",
            choices: [
                "Add a dish",
                "Remove a dish",
                "Update a dish",
                "Show planned dishes",
                "Exit"
            ]
        });
        switch (option){
            case "Add a dish":
                console.clear();
                const dishName = await question("What's the name of dish you wish to add? ");
                await addDish(dishName, {}, planner);
                break;
            case "Remove a dish":
                console.clear();
                const options = await offerOptions();
                break;
            case "Update a dish":
                console.clear();
                break;
            case "Show planned dishes":
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

        // runProgram = false;
    }
}