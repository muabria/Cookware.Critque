// const request = require("supertest");

// const app = require('../app');

// const prismaMock = require('../../mocks/prismaMock');

// const bcrypt = require('bcrypt');
// jest.mock('bcrypt');

// const jwt = require('jsonwebtoken');
// jest.mock('jsonwebtoken');

// describe('/auth', () => {
//     beforeEach(() => {
//         jest.resetAllMocks();
//         jwt.sign.mockReset();
//         jwt.verify.mockReset();
//         bcrypt.hash.mockReset();
//         bcrypt.compare.mockReset();
    
//     });
//     describe('GET /auth', () => {
//         it('returns list of all users', async () => { //needs to be an admin 
//             const users = [
//                 { id: 1, username: '', name: '', password: 'password', admin: true  },
//                 { id: 2, username: '', name: '', password: 'password', admin: true  },
//                 { id: 3, username: '', name: '', password: 'password', admin: true  },
//                 { id: 4, username: '', name: '', password: 'password', admin: true  },

//             ];

//             const token = "";
//             jwt.verify.mockReturnValue(users[0]);
//             prismaMock.user.findUnique.mockResolvedValue(users[0]);

//             prismaMock.user.findMany.mockResolvedValue(users);

//             const response = await request(app).get('/auth').set('Authorization', 'Bearer '+ token);
       
//             expect(response.body).toEqual(users);
//             expect(response.body[0]).toEqual(users[0]);
//             expect(response.body[1]).toEqual(users[1]);
//         });
//     });

//     describe('GET /auth/me', () => { // needs to be logged in
//         it('returns the currently logged in user', async () => {
//             const loggedInUser = {
//                 id: 2,
//                 username: "",
//                 password: ""
//             }
            
//             const token = "";
//             jwt.verify.mockReturnValue(loggedInUser);
//             prismaMock.user.findUnique.mockResolvedValue(loggedInUser);
            
//             const response = await request(app).get('/auth/me').send(loggedInUser).set('Authorization', 'Bearer '+ token);

//             expect(response.body).toEqual(loggedInUser);
//         })
//     })});
