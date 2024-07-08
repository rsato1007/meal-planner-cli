# START HERE
The goal is to develop a plan for my code so it has a chance of being well written.

# Current Status
- Meal Service is basically done, now I need to start building out DailyMeals service. After that will be MealPlannerService, then we'll start building some actual commands and scripts.

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