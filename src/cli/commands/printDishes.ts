import * as fs from 'fs/promises';
import path from "path";

import MealPlannerService from "../../services/MealPlanner";
import settings from "../../settings";

import { renderTextFile } from "@utils/displayCLI";

/**
 * Allows users to save planned meals to a written txt file. Eventually we'll allow revamp to allow for custom templates.
 * Specifically, something akin to templating engines.
 */
export const printDishes = async (planner: MealPlannerService) => {
    let output = ""
    const template = await fs.readFile(path.resolve(process.cwd(), 'templates', 'text.txt'), 'utf-8');
    output = renderTextFile(template, planner);

    await fs.writeFile(settings["print_feature"]["printed_file_path"], output, 'utf8');

    console.log("Meal Planner text was generated successfully at the following location: ", settings["print_feature"]["printed_file_path"])
    return;
}