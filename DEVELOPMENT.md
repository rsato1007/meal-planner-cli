# START HERE
This section allows me to capture my thoughts while coding this project for future reference.

# Current Status
- Refactoring our show meals command for slightly better UI.
- Also refactoring remove to use our newly built functions.

# Additional Thoughts
- Also consider adding methods that help find specific things (like days not planned for, what day a dish/meal is in, etc.)

- Another possibility is building a statistic object for my mealplanner, daily meal, etc. Might not be necessary, but worth completating.

- Also consider doing a config file where the code reads it to allow some customization (think where to store files, whether to archive or delete old files, etc.)

- also would like to build a file that holds current state for meal planner. Think for example, not needing to pass a flag everytime you want to add to Monday's meals or appetizers for Sunday dinner, etc.

- For refactoring, some code still uses any. Find them and refactor.
    - Also review all type assertion code for possible refactor opportunities
    - Also look to refactor formatData code function to return a string instead. This will make testing easier.

# Code Components to Consider
## Additional Comamnds:
- Feature: allowing more commands to make management easier.
- Possible commands: add-many (still determining if this would make sense tbh), remove-many, etc.
    - Another command: print would generate a file with a pretty view of the data. Though this may be combined with pretty view where users can select between HTML or some file type.

## Pretty View Option
- Feature: The ability to do a command which would show a "pretty" version of the data. Essentially HTML with CSS and MAYBE JS.
- Development:
    - We'll would need to create HTML, CSS, and JS then write something akin to EJS that can input data where HTML template is (example: <div>${date}</div>);
    - I would imagine this won't be complex so we can use REGEX for easy translation tbh.
    - We'll need to create a command, but that's not too bad to be honest.
    - Also a more advanced version would be allowing users to customize the HTML/CSS while allowing data to customized.
        - Naturally users would need to ensure they are typing in syntax correctly, but could allow for some excellent dynamic customizations.

## Ingredient List Generation
- Feature: The CLI can pull ingredients from my recipe documents and generate a list of what I need to make the dish.
- Advanced Feature: The CLI can generate an email, document, or something of that nature that contains a list of the ingredients needed.
- Advanced Feature: The CLI can categorize the ingredients to make it easier to shop around.
    - Part of me wonders if I want to eventually build it where you can write a file to specify how to structure the document (like a config file) and read from it.

## Archiving and Retrieving Old Files
- Feature: Not certain on this yet, but essentially it can recognize a new week is upon us and archive the old file. Then it would create a new file for the new week.
    - Perhaps we could also make each file a month? That could also work.
- Additional Feature: It would also be able to retrieve old files.
    - Consider how you would organize the directory for better access.

## Weather API Integration
- Feature: Integrate a weather API so I can determine what recipe would be appropriate that day. 
- Feature: Also maybe integrate family birthday so I can plan for that as well.

## Configuration Ideas
- Eventually I want to expand the freedom and flexibility of this project by allowing users to alter a provided configuration file.
    - One option would be saving current week file, multiple week files, etc.
    - Another would be path to where to save data.
    - Another would be customizing show options. For example, allowing users to show empty days/times or to omit them.

# Bugs
- We'll keep track of bugs here.