// TODO: add auth here
const express = require('express');
const authRouter = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//<------------------------GET ALL USERS------------------------>
//GET /auth/users
authRouter.get("/", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

module.exports = authRouter;