// TODO: seed the DB using Prisma
const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

let mvPass = "";
let bmPass = "";
let hmPass = "";
let kcPass = "";

async function hash() {
    mvPass = await bcrypt.hashSync("MyF@vor1te", SALT_COUNT);
    bmPass = await bcrypt.hashSync("F@ncySh0es", SALT_COUNT);
    hmPass = await bcrypt.hashSync("Ded1c@tion", SALT_COUNT);
    kcPass = await bcrypt.hashSync("De$ignCentra1", SALT_COUNT);
    return (mvPass, bmPass, hmPass, kcPass);
}

hash();

async function seed() {
    console.log("Seeding the database.");
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.category.deleteMany();

    try {
        //Category entries
        const basic = await prisma.category.create({
            data: {
                category: "Basic"
            }
        })

        const cooking = await prisma.category.create({
            data: {
                category: "Cooking"
            }
        })

        const cleaning = await prisma.category.create({
            data: {
                category: "Cleaning"
            }
        })

        const storage = await prisma.category.create({
            data: {
                category: "Storage"
            }
        })

        const gadgets = await prisma.category.create({
            data: {
                category: "Gadgets"
            }
        })

        const miscellaneous = await prisma.category.create({
            data: {
                category: "Miscellaneous"
            }
        })

        //Equipment entries
        const trivet = await prisma.equipment.create({
            data: {
                name: "Cork Trivet",
                description: "A 7-inch circle of cork that protects counter and other surfaces from hot, cold, and wet items. Ideal for hot pans and water stains.",
                image: "https://m.media-amazon.com/images/I/41TDVYs3YsL._AC_US100_.jpg",
                category: { connect: { id: basic.id } },
                brand: "IKEA",
                purchaseLink: "https://www.amazon.com/dp/B00QOLXPV0?psc=1&ref=ppx_yo2ov_dt_b_product_details",
                priceRating: 1
            },
            include: { category: true }
        })

        const dobie = await prisma.equipment.create({
            data: {
                name: "Dobie",
                description: "A cleaning sponge with a little abrasion to get food off.",
                image: "https://m.media-amazon.com/images/I/71WMDYKl1PL._AC_SX679_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Scotch-Brite",
                purchaseLink: "https://www.amazon.com/Scotch-Brite-Dobie-All-Purpose-Pad-Count/dp/B0011DR9WC/ref=sr_1_7?crid=17V6Q2H276G01&keywords=dobie&qid=1699408365&s=home-garden&sprefix=dobie%2Cgarden%2C152&sr=1-7",
                priceRating: 2
            },
            include: { category: true }
        })

        //User entries
        const marisa = await prisma.user.create({
            data: {
                username: 'mvandell',
                email: 'marisavandellos@gmail.com',
                password: mvPass,
                isAdmin: true,
            },

        })

        const brianna = await prisma.user.create({
            data: {
                username: 'muabria',
                email: 'email@email.com',
                password: bmPass.toString(),
                isAdmin: true,
            },

        })

        const henrietta = await prisma.user.create({
            data: {
                username: 'mizhenn',
                email: 'email@email.com',
                password: hmPass.toString(),
                isAdmin: true,
            },

        })

        const kat = await prisma.user.create({
            data: {
                username: 'katc333',
                email: 'email@email.com',
                password: kcPass.toString(),
                isAdmin: true,
            },

        })



        //Post entries
        //Comment entries
        const post1 = await prisma.post.create({
            data: {
                title: "Works great!",
                content: 'I love this! I put one under everything',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: trivet.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water stains from my water pitcher',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })



        delete mvPass, bmPass, hmPass, kcPass;
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