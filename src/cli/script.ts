import fs from 'fs/promises';
import path from 'path';
import MealPlanner from "../models/MealPlanner.js";

/**
 * Checks if file exists for storing user input or if new file needs to be created.
 * 
 * @remarks
 * - Eventually we want to build a settings file that allows us to specify where to create and read file from.
 */
export const createOrGetDataFile = async (): Promise<MealPlanner> => {
    const filePath = path.resolve(process.cwd(), 'data', 'data.json');

    try {
        await fs.access(filePath);
        console.log('Data file already exists, importing data.');
    } catch {
        await fs.writeFile(filePath, JSON.stringify(new MealPlanner(), null, 2), 'utf-8');
        console.log('New data file created.');
    }

    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
};

/**
 * Using current data for planner instance to update file so changes can be persistent.
 * @param planner Meal Planner instance
 * @returns Promise that returns meal planner instance once done.
 */
export const updateFile = async (planner: MealPlanner): Promise<MealPlanner> => {
    try {
        const filePath = path.resolve(process.cwd(), 'data', 'data.json');
        await fs.writeFile(filePath, JSON.stringify(planner, null, 2), 'utf-8');
        console.log('File updated successfully');
        return planner;
    } catch (error) {
        console.error('Error updating file:', error);
        throw error;
    }
};