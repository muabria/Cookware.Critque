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
const bmPass = hash();
const hmPass = hash();
const kcPass = hash();

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
        

        
        //Category entries


        
        //Post entries
        //Comment entries



        delete mvPass, bmPass, hmPass, kcPass;
        console.log("Database is seeded.")
    }
     catch(error) {
        console.error(error);
    }
}