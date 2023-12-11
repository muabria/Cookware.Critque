const app = require("../app");
const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const prismaMock = require("../../mocks/prismaMock");

const JWTsecret = "ABCD"

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// <------------ ADMIN TESTING ------------>

describe("/auth", () => {
    beforeEach(async () => {
        // Delete all users before we start each test

        await prisma.User.deleteMany();


        // Create an admin user
        const brianna = await prisma.User.create({
            data: {
                username: "muabria",
                email: "email@email.com",
                password: bcrypt.hashSync("F@ncySh0es", 10),
                isAdmin: true,
            },
        });
        const response = await request(app) 
        .post('/auth/login')
        .send({
            username: "muabria",
            password: "F@ncySh0es"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        // .set("Authorization", `Bearer ${token}`);
        token = response.body.token;


        console.log(prisma)
        // Create some other non-admin users
        // their usernames will be test_user_0 or test_user_1 etc
        for (let i = 0; i < 10; i++) {
            await prisma.User.create({
                data: {
                    username: `test_user_${i}`,
                    email: `email${i}@email.com`,
                    password: bcrypt.hashSync("F@ncySh0es", 10),
                },
            });
        }
    });

    describe("GET /auth/users", () => {
        it("should return all users for admin user", async () => {
            // we created this admin user in the beforeEach
            // now lets login as that admin user
            const username = "muabria";
            const email = "email@email.com";
            const password = "F@ncySh0es";
            const response = await request(app).post("/auth/login").send({
                username: username,
                password: password,
            });

            // this is the admin's auth token
            const token = response.body.token;

            // send a request to get all the users using admin token
            // if no admin token is provided, it would give 401 which
            // is a test we will create later
            const usersResponse = await request(app)
                .get("/auth/users")
                .set("Authorization", `Bearer ${token}`);

            // expect it to be status code 200
            expect(usersResponse.statusCode).toBe(200);

            // usersResponse.body will contain all of the users from the database
            const allUsers = usersResponse.body;

            // remember when we created our test users in the beforeEach?
            // they should be in allUsers. check if all the test users exist
            // notice how test users would always be from 0 to 9
            // if you check if test_user_10 is in the array, it should fail
            // becuase it was never created in the beforeEach
            for (let i = 0; i < 10; i++) {
                const username = `test_user_${i}`;

                const hasUserInArray = allUsers.find(
                    (user) => user.username === username
                );

                expect(hasUserInArray).toBeTruthy();
            }

            const user = await prisma.user.findUnique({ where: { username } });
            expect(user).not.toBeNull();
        });

        it("should return 401 for non-admin users", async () => {
            // login as test_user_1
            // it is not an admin
            // so it should give 401 because it's not an admin
            const username = "test_user_1";
            const password = "F@ncySh0es";

            const tokenResponse = await request(app).post("/auth/login").send({
                username: username,
                password: password,
            });

            const token = tokenResponse.body.token;

            // Send the request with the non-admin user token
            const response = await request(app)
                .get("/auth/users")
                .set("Authorization", `Bearer ${token}`);

            // Expect unauthorized status code
            expect(response.statusCode).toBe(401);
        });
    });
});

// // <------------ REGISTER TESTING ------------>

// describe('POST /auth/register', () => {
//     it('should create a new user and return user and token', async () => {
//         const username = 'testtest';
//         const email = 'test@test.com';
//         const password = 'TestPass';
//         const hashedPassword ='mockTestPass';
//         const token = "mocktoken";

//         bcrypt.hash.mockResolvedValue(hashedPassword)

//         prisma.user.create.mockResolvedValue({username, email, hashedPassword, token});
//         jwt.sign.mockReturnValue(token)

//         const response = await request(app)
//             .post('/auth/register')
//             .send(  {
//             username,
//             email,
//             password,
//             isAdmin: true

//         })

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('user');
//         expect(response.body.user).toHaveProperty('username', username);
//         expect(response.body.user).toEqual('email', email);
//         expect(response.body.token).toEqual('token',token);
//         const user = await prisma.user.findUnique({ where: { username } });
//         expect(user).not.toBeNull();
//     });
// });

// // <------------ LOGIN TESTING  ------------>

// describe('POST /auth/login', () => {
//     it('should return user and token for valid credentials', async () => {
//         const user = await createUser();
//         const response = await post('/auth/login', {
//             username: user.username,
//             password: user.password,
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toEqual('user');
//         expect(response.body.user).toEqual('username', user.username);
//         expect(response.body).toEqual('token');
//     });

//     it('should return 401 for invalid username', async () => {
//         const response = await post('/auth/login', {
//             username: 'nonexistentuser',
//             password: 'password123',
//         });
//         expect(response.statusCode).toBe(401);
//     });

//     it('should return 401 for invalid password', async () => {
//         const user = await createUser();
//         const response = await post('/auth/login', {
//             username: user.username,
//             password: 'wrongpassword',
//         });
//         expect(response.statusCode).toBe(401);
//     });
// });

// // <------------ USER PROFILE TESTING ------------>

// describe('GET /auth/account', () => {
//     it('should return user profile for authenticated user', async () => {
//         const user = await createUser();
//         const token = generateToken(user);
//         const response = await get('/auth/account', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('')
//     })
// });