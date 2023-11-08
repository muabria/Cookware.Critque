// TODO: seed the DB using Prisma
const db = require("../db");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function hash(pass) {
    const hashedPassword = await bcrypt.hash(pass, SALT_COUNT);
    return hashedPassword;
}

//fill these in
const mvPass = hash("MyF@vor1te");
const bmPass = hash("F@ncySh0es");
const hmPass = hash("Ded1c@tion");
const kcPass = hash("De$ignCentra1");

async function seed() {
    console.log("Seeding the database.");
    try {
        //User entries
        const marisa = await prisma.user.upsert({
            where: {username: 'mvandell'},
            update: {},
            create: {
                username: 'mvandell',
                email: 'marisavandellos@gmail.com',
                password: mvPass.toString(),
                posts: {
                    create: {

                    }
                },
                isAdmin: true,
                comments: {
                    create: {

                    }
                }
            }
        })

        const brianna = await prisma.user.upsert({
            where: {username: 'muabria'},
            update: {},
            create: {
                username: 'muabria',
                email: '',
                password: bmPass.toString(),
                posts: {
                    create: {

                    }
                },
                isAdmin: true,
                comments: {
                    create: {
                        
                    }
                }
            }
        })

        const henrietta = await prisma.user.upsert({
            where: {username: 'mizhenn'},
            update: {},
            create: {
                username: 'mizhenn',
                email: '',
                password: hmPass.toString(),
                posts: {
                    create: {

                    }
                },
                isAdmin: true,
                comments: {
                    create: {
                        
                    }
                }
            }
        })

        const kat = await prisma.user.upsert({
            where: {username: 'katc'},
            update: {},
            create: {
                username: 'katc',
                email: '',
                password: kcPass.toString(),
                posts: {
                    create: {

                    }
                },
                isAdmin: true,
                comments: {
                    create: {
                        
                    }
                }
            }
        })

        //Equipment entries
        const trivet = await prisma.equipment.upsert({
            where: {name: "Cork Trivet"},
            update: {},
            create: {
                name: "Cork Trivet",
                description: "A 7-inch circle of cork that protects counter and other surfaces from hot, cold, and wet items. Ideal for hot pans and water stains.",
                image: "https://m.media-amazon.com/images/I/41TDVYs3YsL._AC_US100_.jpg",
                posts: {
                    create: {

                    }
                },
                categoryId: 1,
                brand: "IKEA",
                purchaseLink: "https://www.amazon.com/dp/B00QOLXPV0?psc=1&ref=ppx_yo2ov_dt_b_product_details",
                priceRating: 1
            }
        })

        const dobie = await prisma.equipment.upsert({
            where: {name: "Dobie"},
            update: {},
            create: {
                name: "Dobie",
                description: "A cleaning sponge with a little abrasion to get food off.",
                image: "https://m.media-amazon.com/images/I/71WMDYKl1PL._AC_SX679_.jpg",
                posts: {
                    create: {

                    }
                },
                categoryId: 3,
                brand: "Scotch-Brite",
                purchaseLink: "https://www.amazon.com/Scotch-Brite-Dobie-All-Purpose-Pad-Count/dp/B0011DR9WC/ref=sr_1_7?crid=17V6Q2H276G01&keywords=dobie&qid=1699408365&s=home-garden&sprefix=dobie%2Cgarden%2C152&sr=1-7",
                priceRating: 2
            }
        })

        const item = await prisma.equipment.upsert({
            where: {name: ""},
            update: {},
            create: {
                name: "",
                description: "",
                image: "",
                posts: {
                    create: {

                    }
                },
                categoryId: 3,
                brand: "",
                purchaseLink: "",
                priceRating: 2
            }
        })
        
        //Category entries
        const basic = await prisma.category.upsert({
            where: {category: "Basic"}, //id 1
            update: {},
            create: {
                category: "Basic"
            }
        })
        
        const cooking = await prisma.category.upsert({
            where: {category: "Cooking"}, //id 2
            update: {},
            create: {
                category: "Cooking"
            }
        })

        const cleaning = await prisma.category.upsert({
            where: {category: "Cleaning"}, //id 3
            update: {},
            create: {
                category: "Cleaning"
            }
        })

        const storage = await prisma.category.upsert({
            where: {category: "Storage"}, //id 4
            update: {},
            create: {
                category: "Storage"
            }
        })

        const gadgets = await prisma.category.upsert({
            where: {category: "Gadgets"}, //id 5
            update: {},
            create: {
                category: "Gadgets"
            }
        })

        const miscellaneous = await prisma.category.upsert({
            where: {category: "Miscellaneous"}, //id 6
            update: {},
            create: {
                category: "Miscellaneous"
            }
        })
        
        //Post entries
        //Comment entries



        delete mvPass, bmPass, hmPass, kcPass;
        console.log("Database is seeded.")
    }
     catch(error) {
        console.error(error);
    }
}