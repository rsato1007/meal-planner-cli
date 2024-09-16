# TABLE OF CONTENTS
- [About](#about)
    - [Motivation](#motivation)
- [How to Use](#how-to-use)
- [Planned Features/Considered Features](#planned-featuresconsidered-features)
- [Documentation](#documentation)

# ABOUT
This is a Command Line Interface (CLI) application written in Node.js that allows users to plan meals for the week.

## MOTIVATION
Historically, I used an Excel spreadsheet template to plan meals. This project was created with the following goals:
1. Simplify and automate the meal planning process.
2. Learn to build CLI applications using Node.js.
3. Explore and better understand Node.js features while building a real-world project.

# HOW TO USE
- Starting off, you'll need to ensure you have Node installed (version 20.4.0) and TypeScript globally installed. Next you'll need to download the project locally and use script npm run build and npm run crcli to use this project. Once completed you'll be able to do mealplan _____ to start running commands.
## Command Usage
All commands (except run) have three optional flags to specify details about the meals:

    -d: The day the action corresponds to (e.g., Monday, Tuesday).
    -t: The meal time (available options: breakfast, lunch, dinner).
    -m: The type of dish (available options: drinks, sides, entrees, appetizers, desserts).

## Example
To add tacos to the dinner plan on Tuesday:

> mealplan add "tacos" -d tuesday -t dinner -m entrees

Side note: The CLI will ensure you don't miss any important flags for certain commands. Such as the add command.

## Available commands:
- add: Adds a meal.
- addMany: Allows you to add multiple meals at once. The flags will allow you to avoid selecting that option for each individual dish.
- remove: Removes a meal. If no flags are provided, the app will start on Monday and search for the first instance of the meal. You can use flags to specify the exact meal if there are duplicates.
- update: Updates a meal by replacing it with a new name. Similar to remove, you can specify flags if there are duplicate entries.
- show: Displays the planned meals in the console. You can use flags to filter the view by day, meal time, or dish type.
- run: Starts an interactive mode that runs continuously until you exit the program.

# PLANNED FEATURES/CONSIDERED FEATURES
- see Developement.md for more detail.