export const validateCondition = (condition: boolean, message: string) => {
    if (!condition) {
        throw new Error(message);
    }
}

export const isValidKey = <T extends string>(key: string, options: string[]): key is T => {
    return options.includes(key);
}