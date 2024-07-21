/*
    All tests written will need to be imported here in order for npm run test to properly run them.
*/
/*
    Relevant resources:
    - https://blog.logrocket.com/exploring-node-js-native-test-runner/
    - https://nodejs.org/docs/latest/api/assert.html
    - https://nodejs.org/docs/latest/api/test.html
*/
import test from "node:test";
import assert from 'node:assert/strict';

import "./mealservice.test.js";

// Until we have a better understand of how mocking works.
// import "./commands.test.js";

test('Example test', () => {
    assert.strictEqual(1, 1);
});