const app = require('../app');
const request = require('supertest');

/* NOTE: this is just an example test, you can delete it
- your tests should be in folders __tests__ co-located with
whichever file they are testing

For example: api/__tests__/users.test.js would test api/users.js
*/

describe('Express App', () => {
    it('is live and responding to requests', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
    })
})