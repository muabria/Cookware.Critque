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
//<--------------------------------GET ALL CATEGORIES-------------------------------->
//GET /api/equipment
apiRouter.get("/categories", async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        res.send(categories);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET SINGLE CATEGORY-------------------------------->
//GET /api/equipment/:id
apiRouter.get("/category/:id", async (req, res, next) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });

        res.send(category);
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

//<--------------------------------GET COMMENTS BY USER----------------------------->
//GET /api/:user/comments 
apiRouter.get("/:user/comments", requireUser, async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { userId: req.user.id },
            include: { user: true }
        });
        res.send(comments);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET ALL COMMENTS----------------------------->
//GET /api/review/:review/comments
apiRouter.get("/comments", async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {postId: req.params.id},
            include: {post: true}
        });
        res.send(comments);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------GET REVIEWS BY EQUIPMENT----------------------------->
//GET /api/equipment/review/:id
apiRouter.get("/equipment/review/:id", async (req, res, next) => {
    console.log(req.params)
    try {
        const reviews = await prisma.post.findMany({
            where: {equipmentId: Number(req.params.id)},
            include: {equipment: true}
        });
        res.send(reviews);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------ADD NEW EQUIPMENT-------------------------------->
//ADMIN ONLY
//POST /api/equipment/:id
apiRouter.post("/equipment/", requireUser, async (req, res, next) => {
    try {
        const { name, description, image, category, brand, purchaseLink, priceRating, } = req.body
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

    } catch (error) {
        next(error);
    }
})


//<--------------------------------UPDATE EQUIPMENT-------------------------------->
//PATCH Update an existing equipment item
apiRouter.patch("/equipment/:id", requireUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, image, category, brand, purchaseLink, priceRating } = req.body;

        const updatedEquipmentItem = await prisma.equipment.update({
            where: { id: Number(req.params.id) },
            data: {
                name: name || undefined,
                description: description || undefined,
                image: image || undefined,
                category: category ? { connect: { id: category.id } } : undefined,
                brand: brand || undefined,
                purchaseLink: purchaseLink || undefined,
                priceRating: priceRating || undefined,
            },
            include: { category: true },
        });

        if (!updatedEquipmentItem) {
            res.status(404).send({ message: "Equipment item not found" });
        } else {
            res.status(200).send(updatedEquipmentItem);
        }
    } catch (error) {
        next(error);
    }
});

//<--------------------------------DELETE EQUIPMENT-------------------------------->

apiRouter.delete("/equipment/:id", requireUser, async (req, res, next) => {
    try {
        const deletedEquipmentItem = await prisma.equipment.delete({
            where: { id: parseInt(req.params.id) },
        });
        if (!deletedEquipmentItem) {
            res.status(404).send({ message: "Equipment item not found" });
        } else {
            res.status(204).send({ message: "Equipment item deleted" });
        }
    } catch (error) {
        next(error);
    }
});

//<--------------------------------MAKE NEW REVIEW-------------------------------->
//POST /api/review
apiRouter.post("/review", requireUser, async (req, res, next) => {
    try {

        const { title, content, rating, equipmentId } = req.body
        const newReview = await prisma.post.create({
            data: {
                user: { connect: { id: req.user.id } },
                title,
                content,
                rating,
                equipment: { connect: { id: equipmentId } },
            },
            include: {
                user: true,
                equipment: true
            }
        });
        res.status(201).send(newReview);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------MAKE NEW COMMENT----------------------------->
//POST /api/comment
apiRouter.post("/comment", requireUser, async (req, res, next) => {
    try {
        const { content, post } = req.body
        const newComment = await prisma.comment.create({
            data: {
                user: { connect: { id: req.user.id } },
                content,
                post: { connect: { id: post.id } },
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


//<--------------------------------UPDATE COMMENT-------------------------------->
//PATCH /api/comment/:id
apiRouter.patch("/comment/:id", requireUser, async (req, res, next) => {
    try {
        const { content } = req.body;
        const updatedComment = await prisma.comment.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                content
            }
        })
        res.send(updatedComment)
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
            where: { id: +req.params.id },
        });
        if (deletedPost.userId !== req.user.id || !deletedPost) {
            return res.status(404).send("Review not found.");
        }
        res.send(deletedPost);
    } catch (error) {
        next(error);
    }
})

//<--------------------------------DELETE COMMENT-------------------------------->
//NOTE: FOR INDIVIDUAL USER AND ADMIN
//DELETE /api/comment/:id
apiRouter.delete("/comment/:id", requireUser, async (req, res, next) => {
    try {
        const deletedComment = await prisma.comment.delete({
            where: { id: +req.params.id },
        });
        if (deletedComment.userId !== req.user.id || !deletedComment) {
            return res.status(404).send("Comment not found.");
        }
        res.send(deletedComment);
    } catch (error) {
        next(error);
    }
})


module.exports = apiRouter;