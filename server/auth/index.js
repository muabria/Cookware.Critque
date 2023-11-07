// TODO: add auth here
const express = require('express');
const authRouter = express.Router();

const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { requireUser } = require('./utils');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//<--------------------------------GET ALL USERS-------------------------------->
//GET /auth/users
authRouter.get("/user", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).res.send(users);
    } catch (error) {
        next(error);
    }
});
//<--------------------------------REGISTER USER-------------------------------->
// POST /auth/signup
authRouter.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password, } = req.body
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        delete user.password
        const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
        res.status(200).send({ user, token });
    } catch (error) {
        next(error)
    }
})

//<--------------------------------LOGIN USERS-------------------------------->
//POST /auth/login
authRouter.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        delete user.password
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({ user, token })
    } catch (error) {
        next(error)
    }
});

//<--------------------------------GET USER PROFILE-------------------------------->
//GET /auth/user/:id

//<--------------------------------DELETE USER-------------------------------->
//NOTE: ONLY FOR ADMIN
//DELETE /auth/user/:id
module.exports = authRouter;