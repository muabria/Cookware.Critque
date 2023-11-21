// const { mockDeep } = require('jest-mock-extended');
// const app = require('../app')
// const request = require('supertest');

// const prismaMock =require('../../mocks/prismaMock');

// describe('GET /api/users', () => {
    
//     it('returns list of all users', async () => {
//         const users = [
//             {   
//                 id: 1, 
//                 username:'mvandell', 
//                 email: 'marisavandellos@gmail.com', 
//                 password:'password',
//                 isAdmin: true
//             },
//             {
//                 id: 2, 
//                 username:'muabria',
//                 email: 'email@mail.com', 
//                 password:'password',
//                 isAdmin: true
//             },
//             {
//                 id: 3, 
//                 username:'mizhenn',
//                 email: 'email@mail.com',
//                 password:'password',
//                 isAdmin: true
//             },
//             {
//                 id: 4, 
//                 username:'katc336',
//                 email: 'email@mail.com',
//                 password:'password',
//                 isAdmin: true
//             }
//         ];

//         prismaMock.users.findMany.mockResolvedValue(users);

//         const response = await request(app).get('/api/users');
        
//         expect(response.body.users).toBe(users);
//     })
// });