import { question } from "@utils/cliUtils";
import { wait } from "@utils/misc";
import { addDish } from "./addDish";
import MealPlannerService from "src/services/MealPlanner";

export const startInteractive = async (planner: MealPlannerService) => {
    // Use a while loop 
    let runProgram = true;
    const choices =
`Main Menu:
  1. Add a dish
  2. Remove a dish
  3. Update a dish
  4. Show planned dishes
  5. Exit
  
Select an option (1-4): `

    console.log("Welcome to the meal planner main menu.")
    await wait(1500);
    while (runProgram) {
        const option = await question(choices);
        switch (option){
            case "1":
                const dishName = await question("What's the name of dish you wish to add? ");
                await addDish(dishName, {}, planner);
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                runProgram = false;
                break;
            default:
                console.log("Invalid choice");
                await wait(1500);
                break;
        }

        // runProgram = false;
    }
}