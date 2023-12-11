const app = require('../app');
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


jest.mock('jsonwebtoken');
jest.mock('bcrypt');
const prismaMock = require('../../mocks/prismaMock');


// <------------ ADMIN TESTING ------------> 

describe('/auth', () => {
    beforeEach(async () => {
        jwt.sign.mockReset(); 
        jwt.verify.mockReset();
        bcrypt.hash.mockReset();
        bcrypt.compare.mockReset();
        await prismaMock.users.deleteMany()

        const brianna = await prismaMock.users.create({
            data: {
                username: 'muabria',
                email: 'email@email.com',
                password: await bcrypt.hashSync("F@ncySh0es", 10),
                isAdmin: true,
            },

        })
    });


describe('GET /auth/users', () => {
    it('should return all users for admin user', async () => {
        const username = 'muabria';
        const email = 'email@email.com';
        const password = 'F@ncySh0es';
        const hashedPassword ='mockTestPass';
        const token = "mocktoken";
        const response = await request(app)
        .post('/auth/login')
        .send ({
            username: username,
            password: password,
        });
       
       
        // bcrypt.hash.mockResolvedValue(password)
        // prismaMock.user.create.mockResolvedValue({username, email, hashedPassword, token })
        // jwt.sign.mockReturnValue(token)


        // const response = await request(app)
        //     .get('/auth/users')
        //     .send(  {
        //     username,
        //     email,
        //     hashedPassword,
        //     isAdmin: true
        // })
        console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toHaveProperty('username', username);
        expect(response.body.user).toHaveProperty('username', password);
        expect(response.body.user).toHaveProperty('email', email);
        expect(response.body).toHaveProperty('token');
        const user = await prisma.user.findUnique({ where: { username } });
        expect(user).not.toBeNull();
    });

    it('should return 401 for non-admin users', async () => {
        const username = 'nonAdminUser';
      const email = 'nonAdmin@email.com';
      const password = 'P@ssw0rd';
      const hashedPassword = 'mockNonAdminPass';
      const token = "mockToken";

      bcrypt.hash.mockResolvedValue(password);
      prismaMock.user.create.mockResolvedValue({
        username,
        email,
        hashedPassword,
        token,
        isAdmin: false, // Set isAdmin to false
      });
      jwt.sign.mockReturnValue(token);

      // Send the request with the non-admin user token
      const response = await request(app)
        .get('/auth/users')
        .set('Authorization', `Bearer ${token}`);

      // Expect unauthorized status code
      expect(response.statusCode).toBe(401);
    });
  });
});

// <------------ REGISTER TESTING ------------> 

describe('POST /auth/register', () => {
    it('should create a new user and return user and token', async () => {
        const username = 'testtest';
        const email = 'test@test.com';
        const password = 'TestPass';
        const hashedPassword ='mockTestPass';
        const token = "mocktoken";
    
        bcrypt.hash.mockResolvedValue(hashedPassword)

        
        prismaMock.user.create.mockResolvedValue({username, email, hashedPassword, token});
        jwt.sign.mockReturnValue(token)


        const response = await request(app)
            .post('/auth/register')
            .send(  {
            username,
            email,
            password,
            isAdmin: true

        })
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', username);
        expect(response.body.user).toEqual('email', email);
        expect(response.body.token).toEqual('token',token);
        const user = await prisma.user.findUnique({ where: { username } });
        expect(user).not.toBeNull();
    });
});

// <------------ LOGIN TESTING  ------------> 

describe('POST /auth/login', () => {
    it('should return user and token for valid credentials', async () => {
        const user = await createUser();
        const response = await post('/auth/login', {
            username: user.username,
            password: user.password,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual('user');
        expect(response.body.user).toEqual('username', user.username);
        expect(response.body).toEqual('token');
    });

    it('should return 401 for invalid username', async () => {
        const response = await post('/auth/login', {
            username: 'nonexistentuser',
            password: 'password123',
        });
        expect(response.statusCode).toBe(401);
    });

    it('should return 401 for invalid password', async () => {
        const user = await createUser();
        const response = await post('/auth/login', {
            username: user.username,
            password: 'wrongpassword',
        });
        expect(response.statusCode).toBe(401);
    });
});


// <------------ USER PROFILE TESTING ------------> 

describe('GET /auth/account', () => {
    it('should return user profile for authenticated user', async () => {
        const user = await createUser();
        const token = generateToken(user);
        const response = await get('/auth/account', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('')
    })
});


