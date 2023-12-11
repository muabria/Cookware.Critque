const app = require('../app');
const request = require('supertest');
// const prismaClient  = require('@prisma/client');
const express = require('express');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


jest.mock('jsonwebtoken');
jest.mock('bcrypt');
const prismaMock = require('../../mocks/prismaMock');
const prisma = new prisma.prismaMock


/* NOTE: this is just an example test, you can delete it
- your tests should be in folders __tests__ co-located with
whichever file they are testing

For example: api/__tests__/users.test.js would test api/users.js
*/

describe('Express App', () => {
    it('is live and responding to requests', async () => {
        const response = await request(app).get('/');
        console.log(response)
        expect(response.status).toBe(200);
    })
});


// <-------- 'GET' EQUIPMENT TESTING --------> 
// it('should return all equipment', async () => {
//     const mockEquipment = [prisma];
//     console.log(mockEquipment)
//     prismaClient.equipment.findUnique();
//     const response = await request(app).get('/api/equipment');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(mockEquipment);
//   });
  
  // <-------- 'GET' SINGLE EQUIPMENT TESTING --------> 
  
  it('should return single equipment', async () => {
    const id = '';
    const mockEquipment = { id };
    prismaMock.equipment.findUnique.mockReturnValue(mockEquipment);
    const response = await request(app).get('/api/equipment/:id');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEquipment);
  });
  
  // <-------- 'POST' EQUIPMENT TESTING --------> 
  it('should create new equipment', async () => {
    const mockEquipment = { name: 'Test Equipment' };
    prisma.equipment.create.mockReturnValue(mockEquipment);
    const response = await request(app)
      .post('/api/equipment')
      .send({ name: 'Test Equipment' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockEquipment);
  });

  
  // <-------- 'PATCH' EQUIPMENT TESTING --------> 
  it('should update existing equipment', async () => {
    const mockEquipment = { id: 1, name: 'Updated Equipment' };
    prismaMock.equipment.update.mockReturnValue(mockEquipment);
    const response = await request(app)
      .patch('/api/equipment/1')
      .send({ name: 'Updated Equipment' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEquipment);
  });
  

  // <------- 'DELETE' EQUIPMENT TESTING --------> 

  it('should delete equipment', async () => {
    const mockEquipment = { id: 1 };
    prisma.equipment.delete.mockReturnValue(mockEquipment);
    const response = await request(app).delete('/api/equipment/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEquipment);
  });
  



// <------------ END TO END TESTING -------------> 

describe('authRouter end-to-end tests', () => {
    let serverInstance;
    let userToken;
  
    beforeAll(async () => {
      // Start the server
      serverInstance = await createServer();
    });
  
    afterAll(async () => {
      // Stop the server
      await serverInstance.close();
    });
  
    beforeEach(async () => {
      // Clear existing user data
      await prisma.user.deleteMany({});
    });
  
    it('should successfully register a new user', async () => {
      const username = 'johndoe';
      const email = 'johndoe@example.com';
      const password = 'password123';
  
      const response = await request(serverInstance)
        .post('/auth/register')
        .send({ username, email, password });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe(username);
      expect(response.body.user.email).toBe(email);
      expect(response.body).toHaveProperty('token');
    });
  
    it('should successfully login a user', async () => {
      const username = 'janedoe';
      const email = 'janedoe@example.com';
      const password = 'password456';
  
      await prisma.user.create({
        data: { username, email, password: await bcrypt.hash(password, SALT_COUNT) },
      });
  
      const response = await request(serverInstance)
        .post('/auth/login')
        .send({ username, password });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe(username);
      expect(response.body.user.email).toBe(email);
      expect(response.body).toHaveProperty('token');
  
      userToken = response.body.token;
    });
  
    it('should successfully retrieve user profile with valid token', async () => {
      const response = await request(serverInstance)
        .get('/auth/account')
        .set('Authorization', `Bearer ${userToken}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('email');
    });
  });
  