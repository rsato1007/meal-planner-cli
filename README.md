# TABLE OF CONTENTS
TO BE WRITTEN

# ABOUT
A project that allows users to plan meals out for the week using a CLI.

## MOTIVATION
Historically I utilized an excel spreadsheet to plan out my meals, but this project gives me an opportunity to: (a) familiarize myself with Node's internal features (b) get comfortable with building out CLIs (c) and identify opportunities to automate my process for meal planning.

# HOW TO USE
- To be written
- Available commands:
    - Add, Remove, update and show.

# PLANNED FEATURES/CONSIDERED FEATURES
NOTE: This is more of a brainstorming document for ideas than guaranteed features.
- Pretty View: ability for the code to open the data as HTML file with CSS to display a pretty viewing option.
    - As an extension, the ability to allow users to customize the HTML/CSS code while allowing it to still read the data.

- Additional commands:
    - remove many dishes at a time: the user would be able to specify (using a flag/argument) what meals they wanted removed. For example: mealplan remove-many -d sunday would remove all dishes from Sunday.
    - reset: similar to remove, but would reset the whole planner.
    - add many: possibly do an add many command to make adding multiple easier. However, this feature is one that may not be implemented.
    - I don't have specific commands here, but adding for the ability to search for specific information. For example, finding what day a meal was added to.

- Additional QOL:
    - Possibly exploring doing tab completions for users typing out CLI commands
        - I would need to explore options for this.
    - This would be a while out, but building a more dynamic version of this CLI for new comers is being considered.
    - Some help options to help new users.
    - a simplistic redo/undo feature 

- Preferences: The ability to add settings for the CLI to reduce type commands. For example, I can type mealplan config -d monday and it would default to monday for now. Plus we can do mealplan config show to show configuration options. 

- Automatic File Archive System: Essentially, the application will recognize a new week has started and will either remove or move the old file via an archive system
    - Also using a config file to allow users to determine what they would prefer: remove, move, and where to store such files for easy access.

- Ingredient List Generation: This feature is more for myself, but where the application can read my recipes stored in word documents to generate a list of ingredients needed to create the dishes.
    - A QOL for this would be categorizing ingredients.
    - possibly create a file or email with ingredient list. Again we can explore doing both and providing the users options for their preferences.

- Weather integration: Also integration with a free weather API so the user can get upcoming weather to better plan their meals.

# DOCUMENTATION
- NOTE: THIS NEEDS TO BE UPDATED OR MOVED SOMEWHERE.
- For now below is the current code structure in the event anyone wishes to utilize or build off this project.
    - models: How each data is structured.
    - services: All business logic pertaining to models is stored here.
    - cli: Stores all CLI commands and initial scripts that run.