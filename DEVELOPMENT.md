# START HERE
This section captures my thoughts and plans while coding this project for future reference.

# Current Status
- We are adding a remove many option to make changes easier.

# Planned Features
## Additional Commands
- Goal: Add new commands to improve usability and flexibility.
- Potential Commands:
    - remove-many: Supports removing multiple meals simultaneously.
    - print: Generates a file containing a formatted view of meal data. This may be combined with the "Pretty View" feature to allow users to select output formats (e.g., HTML, CSV).

# Pretty View Option
- Goal: Provide a visually formatted output of the meal plan data, potentially in HTML.
- Approach:
    - Develop HTML, CSS, and optional JS templates to create "pretty" views.
    - Consider using a lightweight templating engine (e.g., EJS or a custom solution) to insert dynamic data into the HTML template (e.g., <div>${meal_date}</div>).
    - Basic version: Predefined templates for users.
    - Advanced version: Allow users to customize the HTML/CSS to modify how data is displayed.
    - Consideration: Use regular expressions for simple string replacements, though this might be replaced with a templating engine if it becomes too complex.

# Ingredient List Generation
- Goal: Automatically generate a shopping list based on the ingredients in selected recipes.
- Advanced Features:
    - The CLI can output the list in different formats (e.g., text, email, document).
    - Categorize ingredients by section (e.g., produce, dairy) to simplify shopping.
    - Consider developing a configuration file where users can specify the structure of the output (e.g., grouping ingredients, sorting alphabetically).

# Archiving and Retrieving Files
- Goal: Automate weekly or monthly archiving of meal plans.
    - Create a system to recognize when a new week/month begins, archive the old data, and create a new file for the current period.
- Advanced: Allow users to retrieve and view archived files easily.
- Consideration: Determine the best directory structure for storing and retrieving files (e.g., year/month/week).

# Weather API Integration
- Goal: Provide weather-based meal suggestions.
    - Use a weather API to recommend appropriate recipes based on the forecast.
    - Integrate reminders for family birthdays or special events.
    - Consideration: Define how weather conditions will map to specific meals (e.g., warm soups on cold days).

# Configuration File
- Goal: Provide users with the ability to customize aspects of the tool via a configuration file.
    - Possible Config Options:
        - File save paths (e.g., archive location).
        - Visibility of empty days/times in meal plans.
        - Customization for output formats (e.g., HTML/CSS templates, showing/hiding empty fields).
        - Archiving options (weekly vs. monthly).

# Refactoring & Optimization
- Refactor type assertions to make the codebase cleaner and easier to maintain.
- Refactor the show command to return strings for better testability and modularity.
- Refactor the remove command to use shared functions from the update command to reduce redundancy.
- Expand test coverage to ensure edge cases are handled effectively, particularly for complex commands like add-many and pretty view.

# Bugs and Known Issues