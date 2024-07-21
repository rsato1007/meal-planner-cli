/*
    Used for utility functions that act on simple data structures such as numbers, strings, and booleans.
*/
export const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}  