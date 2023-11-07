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


        //Post entries


        //Equipment entries


        //Comment entries


        //Category entries


        
        delete mvPass, bmPass, hmPass, kcPass;
        console.log("Database is seeded.")
    }
     catch(error) {
        console.error(error);
    }
}