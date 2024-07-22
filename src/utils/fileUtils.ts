import * as fs from 'fs/promises';
import * as path from 'path';

import MealPlanner from '../models/MealPlanner';

// Function to get the file path, allowing future extension for custom paths
const getFilePath = (): string => {
    return path.resolve(process.cwd(), 'data', 'data.json');
};

/**
 * Checks if file exists for storing user input or if new file needs to be created.
 * 
 * @remarks
 * - Eventually we want to build a settings file that allows us to specify where to create and read file from.
 */
export const createOrGetDataFile = async (): Promise<MealPlanner> => {
    const filePath = getFilePath();

    try {
        await fs.access(filePath);
    } catch {
        try {
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, JSON.stringify(new MealPlanner(), null, 2), 'utf-8');
        } catch (error) {
            console.error('Error creating data file:', error);
            throw error;
        }
    }

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as MealPlanner;
    } catch (error) {
        console.error('Error reading data file:', error);
        throw error;
    }
};

/**
 * Using current data for planner instance to update file so changes can be persistent.
 * @param planner Meal Planner instance
 * @returns Promise that returns meal planner instance once done.
 */
export const updateFile = async (planner: MealPlanner): Promise<MealPlanner> => {
    const filePath = getFilePath();

    try {
        await fs.writeFile(filePath, JSON.stringify(planner, null, 2), 'utf-8');
        return planner;
    } catch (error) {
        console.error('Error updating file:', error);
        throw error;
    }
};