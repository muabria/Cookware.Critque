// TODO: add API router here and all API sub-routers
const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require('../auth/utils');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<--------------------------------GET ALL EQUIPMENT-------------------------------->
//GET /api/equipment
apiRouter.get("/equipment", async (req, res, next) => {
    try {
        const equipment = await prisma.equipment.findMany();
        res.send(equipment);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET SINGLE EQUIPMENT-------------------------------->
//GET /api/equipment/:id
apiRouter.get("/equipment/:id", async (req, res, next) => {
    try {
        const equipment = await prisma.equipment.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(equipment);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET ALL REVIEWS-------------------------------->
//GET /api/review
apiRouter.get("/reviews", async (req, res, next) => {
    try {
        const review = await prisma.post.findMany();
        res.send(review);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET SINGLE REVIEW-------------------------------->
//GET /api/review/:id
apiRouter.get("/review/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });
        const review = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(review);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------ADD NEW EQUIPMENT-------------------------------->
//POST /api/equipment/:id
apiRouter.post("/equipment/", requireUser, async (req, res, next) => {
    try{
    const { name, description, image, category, brand, purchaseLink, priceRating,} = req.body
    const newEquipment = await prisma.equipment.create({
        data: {
            name, 
            description, 
            image, 
            category: { connect: { id: category.id } },
            brand,
            purchaseLink,
            priceRating,
        },
        include: { category: true }    
    });
res.status(201).send(newEquipment);

}catch (error) {
    next(error);
}
})

//<--------------------------------MAKE NEW REVIEW-------------------------------->
//POST /api/review
//NOTE: Need to have requireUser added. 
//Prisma error will be: arguement user is missing
apiRouter.post("/review", requireUser, async (req, res, next) => {
    try {

        const { title, content, rating, equipment } = req.body
        const newReview = await prisma.post.create({
            data: {
                title,
                content,
                rating,
                equipment: { connect: { id: equipment.id } },
            },
            include: { equipment: true } 
        });
        res.status(201).send(newReview);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------MAKE NEW COMMENT----------------------------->
//POST /api/comment
//NOTE: Need to have requireUser added. 
apiRouter.post("/comment", requireUser, async (req, res, next) => {
    try {
        const { content, post } = req.body
        const newComment = await prisma.comment.create({
            data: {
                user: {connect: {id: req.user.id}},
                content,
                post: {connect: {id: post.id}},
            },
            include: {
                user: true,
                post: true
            }
        });
        res.status(201).send(newComment);
    } catch (error) {
        next(error);
    }
})



//<--------------------------------UPDATE REVIEW-------------------------------->
//PATCH /api/review/:id
//NOTE: Need to have requireUser added
apiRouter.patch("/review/:id", requireUser, async (req, res, next) => {
    try {
        const { title, content, rating, equipment } = req.body;
        const updatedReview = await prisma.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title,
                content,
                rating,
                equipment
            }
        })
        res.send(updatedReview)
    } catch (error) {
        next(error);
    }
});

//<--------------------------------DELETE REVIEW-------------------------------->
//NOTE: FOR INDIVIDUAL USER AND ADMIN
//DELETE /api/review/:id
apiRouter.delete("/review/:id", requireUser, async (req, res, next) => {
    try {
        const deletedPost = await prisma.post.delete({
            where: {id: +req.params.id},
        });
        if (deletedPost.userId !== req.user.id || !deletedPost) {
            return res.status(404).send("Review not found.");
        }
        res.send(deletedPost);
    } catch (error) {
        next(error);
    }
})


module.exports = apiRouter;