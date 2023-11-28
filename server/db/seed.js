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


    //<-------------------------------- CATEGORIES -------------------------------->

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

        //<-------------------------------- ALL EQUIPMENTS -------------------------------->

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

        const Mandolin = await prisma.equipment.create({
            data: {
                name: "Mandolin",
                description: "The Mandolin is a tool that has been used in every professional kitchen I have worked in. It usually has a couple of blade options and can slice vegetables as thin as paper. It can also julienne veggies and, with the turn of the mechanism, cut French fry potatoes. For the home cook, there are cheaper plastic varieties. These generally have different blade options as well.",
                image: "https://cdn.cleaneatingmag.com/wp-content/uploads/2015/07/mandoline.jpg?width=730",
                category: { connect: { id: gadgets.id } },
                brand: "Target",
                purchaseLink: "https://www.amazon.com/Scotch-Brite-Dobie-All-Purpose-Pad-Count/dp/B0011DR9WC/ref=sr_1_7?crid=17V6Q2H276G01&keywords=dobie&qid=1699408365&s=home-garden&sprefix=dobie%2Cgarden%2C152&sr=1-7",
                priceRating: 2
            },
            include: { category: true }
        })

        const blender = await prisma.equipment.create({
            data: {
                name: "Blender",
                description: "You can blend creamy smoothies, craft cocktails, swirl together sorbet and ice cream bases, make sauces, and whip up condiments… You can make breadcrumbs, grind or grate hard cheeses, make salsas, puree soups and baby food.",
                image: "https://www.kqzyfj.com/click-8280905-13084467",
                category: { connect: { id: gadgets.id } },
                brand: "Kitchen Aid",
                purchaseLink: "https://www.vitamix.com/us/en_us/shop/5200-getting-started?cjdata=MXxOfDB8WXww&COUPON=06-373&cjdata=MXxOfDB8WXww&cjevent=07e10d84881211ee830804dd0a82b82d&CID=aff",
                priceRating: 4.5
            },
            include: { category: true }
        })
        const handBlender = await prisma.equipment.create({
            data: {
                name: "Hand Blender",
                description: "Designed for the perfect puree. This KitchenAid® Variable Speed Corded Hand Blender features an 8 inch removable blending arm with 4 point stainless steel blade to blend everything from smoothies, to milk shakes, soups, sauces and so much more.",
                image: "https://www.kitchenaid.com/is/image/content/dam/global/kitchenaid/countertop-appliance/portable/images/hero-KHBV53IC.tif?$PRODUCT-FEATURE$&fmt=webp-alpha",
                category: { connect: { id: gadgets.id } },
                brand: "Kitchen Aid",
                purchaseLink: "https://www.kitchenaid.com/countertop-appliances/hand-blenders/hand-blender-products/p.variable-speed-corded-hand-blender.khbv53ic.html?region_id=LDC822&productcategory=hand_blenders&cmp=kad:wp_sda%7C01%7C00365%7Czz%7Csh%7Ct02%7Cp77%7Czz%7Cv04_kasa_ppc:ga:ps:txt:txt:cpc:shop_smartshop_rob:na:na:20356836168::c&gad_source=1&gclid=Cj0KCQiApOyqBhDlARIsAGfnyMoGRT2G3lAEG40DUWwlf2ARsjuoEG9A6CYXPI2RuIxdR2wtxaR9PHoaAs9YEALw_wcB&gclsrc=aw.ds",
                priceRating: 2
            },
            include: { category: true }
        })

        const foodProcessor = await prisma.equipment.create({
            data: {
                name: "Food Processor",
                description: "One of the tools I carry with me everywhere is a spice grinder. I use one that has a removable bowl for washing, so I avoid flavor cross contamination. It can be used to grind your coffee beans or toasted whole spices for ultimately fresh spice flavors that can be added to your recipes.",
                image: "https://cdn.cleaneatingmag.com/wp-content/uploads/2015/07/spicegrinder.jpg?width=730",
                category: { connect: { id: gadgets.id } },
                brand: "Kitchen Aid",
                purchaseLink: "https://www.amazon.com/Scotch-Brite-Dobie-All-Purpose-Pad-Count/dp/B0011DR9WC/ref=sr_1_7?crid=17V6Q2H276G01&keywords=dobie&qid=1699408365&s=home-garden&sprefix=dobie%2Cgarden%2C152&sr=1-7",
                priceRating: 2
            },
            include: { category: true }
        })

        const juicer = await prisma.equipment.create({
            data: {
                name: "Juicer",
                description: "A juicer is a great tool for squeezing all the basics like lemon, lime, and orange juice when called for in multiple recipes – but you should take advantage of this appliance for juicing all varieties of fruits and vegetables. Juicers save you significant muscle and time by extracting the most juice possible while separating the parts of the produce you may not need or want – like pulp, skins, and seeds. These can go right to your compost bin!.",
                image: "https://surlatable.aiy7.net/6eA6mq",
                category: { connect: { id: gadgets.id } },
                brand: "Ninja",
                purchaseLink: "",
                priceRating: 2
            },
            include: { category: true }
        })

        const pantryContainer = await prisma.equipment.create({
            data: {
                name: "Pantry Shelf/Containers",
                description: "If you cannot renovate, simply add baskets to the shelves so that you can pull them out to access what is in the back. You can also Purcahse Pantry storage based containers to use as storage for you.",
                image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/project%20prism%2Fcolor%20search%20archive%2Fa54c4855e6b1c7a66c738fd7be85d7a7b1cb503d",
                category: { connect: { id: storage.id } },
                brand: "",
                purchaseLink: "",
                priceRating: 2
            },
            include: { category: true }
        })

        // const test = await prisma.equipment.create({
        //     data: {
        //         name: "",
        //         description: "",
        //         image: "",
        //         category: { connect: { id: gadgets.id } },
        //         brand: "Ninja",
        //         purchaseLink: "",
        //         priceRating: 2
        //     },
        //     include: { category: true }
        // })

        // const test2 = await prisma.equipment.create({
        //     data: {
        //         name: "",
        //         description: "",
        //         image: "",
        //         category: { connect: { id: gadgets.id } },
        //         brand: "Ninja",
        //         purchaseLink: "",
        //         priceRating: 2
        //     },
        //     include: { category: true }
        // })

        //<-------------------------------- USERS -------------------------------->

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
                username: 'katc336',
                email: 'email@email.com',
                password: kcPass.toString(),
                isAdmin: true,
            },

        })



        //Post entries

        //<-------------------------------- COMMENT ENTRIES -------------------------------->

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

        const post2 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I love this more than Post 1's!`,
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: dobie.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water stains from my water pitcher',
                        user: { connect: { id: kat.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post3 = await prisma.post.create({
            data: {
                title: "Works like a CHARM!",
                content: `I love this more and more everyday each time I use it!`,
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: handBlender.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water stains from my water pitcher',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post4 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I love this more than Post 1's!`,
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: blender.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water stains from my water pitcher',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post5 = await prisma.post.create({
            data: {
                title: "AHHMAZING!",
                content: `I love this! Great Purchase!`,
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: Mandolin.id } },
                comments: {
                    create: {
                        content: 'Using my own Mandolin amd im loving this purchsee!',
                        user: { connect: { id: kat.id } },
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