const {faker} = require('@faker-js/faker')
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const users = [
    {
        username: 'mvandell',
        email: 'marisavandellos@gmail.com',
        password: bcrypt.hashSync("MyF@vor1te", SALT_COUNT),
        isAdmin: true,
    },
    {
        username: 'muabria',
        email: 'email@email.com',
        password: bcrypt.hashSync("F@ncySh0es", SALT_COUNT),
        isAdmin: true,
    },
    {
        username: 'mizhenn',
        email: 'email@email.com',
        password: bcrypt.hashSync("Ded1c@tion", SALT_COUNT),
        isAdmin: true,
    },
    {
        username: 'katc336',
        email: 'email@email.com',
        password: bcrypt.hashSync("De$ignCentra1", SALT_COUNT),
        isAdmin: true,
    },
];
for (let i = 0; i < 10; i++) { //add posts and comments from an array?
    users.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync(faker.internet.password({length: 10}), SALT_COUNT),
            isAdmin: faker.datatype.boolean({probability: 0.2}),
        })
};

const categories = [
    "Basic", "Cooking", "Cleaning", "Storage", "Gadgets", "Miscellaneous"
];

module.exports = {
    users,
    categories
};