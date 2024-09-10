# TABLE OF CONTENTS
- [About](#about)
    - [Motivation](#motivation)
- [How to Use](#how-to-use)
- [Planned Features/Considered Features](#planned-featuresconsidered-features)
- [Documentation](#documentation)

# ABOUT
A CLI application written in NodeJS that allows the user to plan meals for the week.

## MOTIVATION
Historically, I utilized a excel spreadsheet template to plan out meals. However, this CLI project gives me a chance to accomplish a few things:
1. Simplify and automate the process for meal planning.
2. Learn how to build CLIs using Node.
3. In addition to Node CLIs, getting to better know Node's various features.

# HOW TO USE
- NOTE: Eventually this project may be revamped to be a NPM project, but currently is unofficial.
- Starting off, you'll need to ensure you have Node installed (version 20.4.0) and TypeScript globally installed. Next you'll need to download the project locally and use script npm run build and npm run crcli to use this project. Once completed you'll be able to do mealplan _____ to start running commands.
- Every single available command has three optional flags:
    - -d: What day the action corresponds to.
    - -t: What meal time the action corresponds to (i.e., breakfast, lunch, or dinner)
    - -m: What type of dish we are working with. Current options: drinks, sides, entrees, appetizers, and desserts.

    - For example: mealplan add "tacos" -d tuesday -t dinner -m entress will add tacos to the entrees list for Tuesday's dinner. Certain commands will also ensure you don't miss any important flags as well.
- Available commands:
    - "add": adds a meal
    - "remove": removes a meal. If no flags are specified, the app will start on Monday and look until it finds a dish finding the corresponding name. You can also pass flags if you wish to specify where the dish is (espcially if the same dish is listed twice in your meal planner)
    - "update": updates the meal provide to the new name also provided. Same case as with the remove command where you are advised to pass flags and specify which dish to update if the dish name is listed multiple times in your planner.
    - "show": shows planned meals in console. Also accepts flags to specify which part of the planner you wish to view.

# PLANNED FEATURES/CONSIDERED FEATURES
NOTE: Treat this as a list of ideas that are either likely to be added or being heavily considered..
- Pretty View: ability for the code to open the data as HTML file with CSS to display a pretty viewing option.
    - An extension of this feature will be allowing users to build a HTML/CSS template that the CLI app can read and inject the data into (think back to PHP days/EJS)
    - Another considered feature is the ability to create documents with pretty view of data. Examples include: MS word doc, MS excel, basic txt file, etc. 

- Additional commands: below is some commands being considered to provide users with more options to work with:
    - remove-many: a commmand that would allow users to remove many dishes including reseting the whole planner. For example: mealplan remove-many -d sunday would remove all dishes from Sunday.
    - add many: possibly do an add many command to make adding multiple easier. However, this feature is one that may not be implemented.
    - I don't have specific commands here, but adding for the ability to search for specific information. For example, finding what day a meal was added to.

- Additional QOL:
    - a simplistic redo/undo feature
    - Asking users to confirm action to reduce mistakes. 

- Automatic File Archive System: Essentially, the application will recognize a new week has started and will either remove or move the old file via an archive system

- Configuration Options: Providing users with a config file to allow for customization options including, but not limited to:
    - Where to store data
    - The user's preferred method for viewing option: HTML, Word Doc, Etc.
    - Extending automatic file archive system if the user only prefers a couple weeks saved, all weeks saved, etc.
    - Allowing the user to pre-select flags to avoid redunancy in typing. Example would be command saving which day they are working with and allowing the user to update when ready.

- Ingredient List Generation: This feature is more for myself, but where the application can read my recipes stored in word documents to generate a list of ingredients needed to create the dishes.
    - A QOL for this would be categorizing ingredients.
    - possibly create a file or email with ingredient list. Again we can explore doing both and providing the users options for their preferences.

- API integration: Also integration with a free weather API so the user can get upcoming weather to better plan their meals. Also other free APIs for things like: pricing, nutrition, etc.
    - Mostly like to happen here is weather integration.

- Helper command: To improve QOL, also exploring a command to help users with using the CLI. Think of it almost like a tutorial in a sense. 

- Dynamic CLI: Essentially, a continuous running CLI. FOr example, doing mealplan start means the app keeps running until the user quits.

# DOCUMENTATION
- NOTE: THIS NEEDS TO BE UPDATED OR MOVED SOMEWHERE.
- Documentation has been removed and will be revamped to a separate section.s