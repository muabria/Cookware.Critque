const app = require('../app');
const request = require('supertest');
const userData = require('../auth/index');


// <------------ ADMIN TESTING ------------> 


describe('GET /auth/users', () => {
    it('should return all users for admin user', async () => {
        const username = 'muabria';
        const email = 'email@email.com';
        const password = 'F@ncySh0es';
        const response = await get('/auth/users', 
        {
            username,
            email,
            password,
            isAdmin: true
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', username);
        expect(response.body.user).toHaveProperty('email', email);
        expect(response.body).toHaveProperty('token');
        const user = await prisma.user.findUnique({ where: { username } });
        expect(user).not.toBeNull();
    });

    it('should return 401 for non-admin users', async () => {
        const user = await createUser();
        const token = generateToken(user);
        const response = await get('/auth/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.statusCode).toBe(401);
    });
});

// <------------ REGISTER TESTING ------------> 

describe('POST /auth/register', () => {
    it('should create a new user and return user and token', async () => {
        const username = 'testuser';
        const email = 'testuser@example.com';
        const password = 'password123';
        const response = await post('/auth/register', {
            username,
            email,
            password,
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', username);
        expect(response.body.user).toHaveProperty('email', email);
        expect(response.body).toHaveProperty('token');
        const user = await prisma.user.findUnique({ where: { username } });
        expect(user).not.toBeNull();
    });

    it('should return 400 for missing required fields', async () => {
        const response = await post('/auth/register');
        expect(response.statusCode).toBe(400);
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
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', user.username);
        expect(response.body).toHaveProperty('token');
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


