# START HERE
This section allows me to capture my thoughts while coding this project for future reference.

# Current Status
- Overall: Finished up simple validation methods for add and wrote remove functionality. Now I would like to be able to update a meal and program a real basic show option. 

- Also consider adding methods that help find specific things (like days not planned for, what day a dish/meal is in, etc.)
    - As an extension of this, consider refactoring existing removal code to use the info property to determine if we can skip a property or not.

- Another possibility is building a statistic object for my mealplanner, daily meal, etc. Might not be necessary, but worth completating.

- Also consider doing a config file where the code reads it to allow some customization (think where to store files, whether to archive or delete old files, etc.)

- also would like to build a file that holds current state for meal planner. Think for example, not needing to pass a flag everytime you want to add to Monday's meals or appetizers for Sunday dinner, etc.

- Also it's time to start to thinking about putting types/interfaces into a dedicated file.
    - Plus this would allow me to rethink them as needed.

- As a side note, would like to revisit 
# Code Components to Consider
## Persistent Storage
- Starting off, we need to ensure the data is persistent. I was thinking either .txt or .json file.
    - After some research, .json would be best for a variety of reasons. One reason is size differences are negiligible enough. So .json plays nicely with Node.JS for sure.

## Pretty View Option
- Feature: The ability to do a command which would show a "pretty" version of the data. Essentially HTML with CSS and MAYBE JS.
- Development:
    - We'll would need to create HTML, CSS, and JS then write something akin to EJS that can input data where HTML template is (example: <div>${date}</div>);
    - I would imagine this won't be complex so we can use REGEX for easy translation tbh.
    - We'll need to create a command, but that's not too bad to be honest.

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