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


test('Example test', () => {
    assert.strictEqual(1, 1);
});