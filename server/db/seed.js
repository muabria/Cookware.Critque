// TODO: seed the DB using Prisma
const { faker } = require('@faker-js/faker')
const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const data = require("./seedData.js")
const equipments = require("./equipmentData.js")
const posts = require("./postData.js")
console.log(posts)

async function seed() {
    console.log("Seeding the database.");
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.category.deleteMany();

    try {
        let user1;
        let equipment1;
        for (const userData of data.users) {
            const user = await prisma.user.create({
                data: userData,
            });
            if (user.username === "mvandell") {
                user1 = user.id;
            }
        }
        for (let i=0; i < data.categories.length; i++) {
            await prisma.category.create({
                data: {
                    id: i,
                    category: data.categories[i],
                }
            })
        }
        for (const equipmentData of equipments.equipments) {
            const equip = await prisma.equipment.create({
                data: equipmentData,
                include: {category: true}
            })
            if (equip.name === "Cork Trivet") {
                equipment1 = equip.id;
            }
        }
        for (const postData of posts.posts) {
            const post = await prisma.post.create({
                data: {
                    title: postData.title,
                    content: postData.content,
                    rating: postData.rating,
                    
                },
                include: {}
            })
        }

        console.log("Database is seeded.")
    }
    catch (error) {
        console.error(error);
    }
}

seed().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
})