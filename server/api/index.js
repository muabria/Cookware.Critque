// TODO: add API router here and all API sub-routers
const express = require('express');
const apiRouter = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<------------------------GET ALL USERS------------------------>
//GET /api/posts
apiRouter.get("/", async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany();
        res.send(posts);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;