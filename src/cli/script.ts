import fs from 'fs';
import path from 'path';

import MealPlanner from "../models/MealPlanner.js"
/**
 * Checks if file exists for storing user input or if new file needs to be created.
 * 
 * @remarks
 * - Eventually we want to build a settings file that allows us to specify where to create and read file from.
 */
export const createOrGetDataFile = () => {
    const filePath = path.resolve(process.cwd(), 'data', 'data.json');

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(new MealPlanner(), null, 2), 'utf-8');
        console.log('Blank data file created.');
    } else {
        console.log('Data file already exists, importing data.');
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export const updateFile = (planner: MealPlanner) => {
    const filePath = path.resolve(process.cwd(), 'data', 'data.json');
    fs.writeFileSync(filePath, JSON.stringify(planner, null, 2), 'utf-8');
    return planner;
}