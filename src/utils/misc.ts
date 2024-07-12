/**
 * Useful for when you want the CLI to display a message, wait a second or two, then continue displaying other information.
 * @param ms - Miliseconds
 * @returns Promise that returns nothing.
 */
export const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}