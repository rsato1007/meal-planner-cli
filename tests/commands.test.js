import { addDish } from '../dist/cli/commands/addDish.js';
import MealPlannerService from "../dist/models/MealPlanner.js"
import assert from 'node:assert';
import { mock, test } from 'node:test';

/**
 * Starting to build a test for mocking more complex things involving user input and returning commands.
 * This test is incomplete and will fail as I work towards understand what the input should be.
 */
test('addDish successfully adds a dish', async (t) => {
    // Mock dependencies
    mock('path-to-validateOptionsInput', {
        validateOptionsInput: mock.fn().mockResolvedValue({ day: 'Monday', time: 'Dinner', mealType: 'Vegan' }),
    });
    mock('path-to-getMissingOptions', {
        getMissingOptions: mock.fn().mockResolvedValue({ day: 'Monday', time: 'Dinner', mealType: 'Vegan' }),
    });
    mock('path-to-updateFile', {
        updateFile: mock.fn().mockResolvedValue(true),
    });

    // Mock MealPlannerService methods
    const mockedPlanner = new MealPlannerService(new MockPlanner());
    t.mock.method(mockedPlanner, 'getMealsByDay').mockReturnValue({
        getDishesByTime: () => ({
            addDish: mock.fn()
        }),
    });
    t.mock.method(mockedPlanner, 'getAllDays').mockReturnValue(new MockPlanner());

    // Call addDish
    await addDish('Tofu Stir Fry', { day: 'Monday', time: 'Dinner', mealType: 'Vegan' }, mockedPlanner);

    // Assert expectations
    assert(mockedPlanner.getMealsByDay.mock.calls.length === 1, 'getMealsByDay should be called once');
    assert(mockedPlanner.getMealsByDay.mock.calls[0].args[0] === 'Monday', 'getMealsByDay should be called with "Monday"');
    assert.strictEqual(console.log.mock.calls[0].args[0], 'Meal Added Successfully!', 'Should log success message');

    // Restore mocks after test
    mock.restoreAll();
});