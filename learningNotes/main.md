# Overview
- This will house all my learning experiences from creating this project.

# Notes:
- Starting off, it turns TypeScript's typing system for objects with optional properties is kind of funky. In my project, this was an area where I utilized type assertions more aggressively, but it would be worth exploring how we can approach this in the future.
- Secondly, if I use Node's filing system or readline for interfaces for CLIs, I need to ensure it's fully closed.
    - It might be best practice to create the interface and close it in the same function instead of having it top level on a file.
- I also think it's best to capture many things in a reusable function. For example, a function that gets users selection while ensuring they are selecting a valid option.