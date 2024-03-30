const posts = [
    {
        title: "Works great!",
        content: 'I love this! I put one under everything',
        rating: 5,
        user: { connect: { id: 0 } },
        equipment: { connect: { id: 0 } },
        comments: {
            create: {
                content: 'Keeps my counter from getting water stains from my water pitcher',
                user: { connect: { id: 0 } },
            }
        }
    },
    {
        title: "Love this!",
        content: 'I use this so often',
        rating: 5,
        user: { connect: { id: 0 } },
        equipment: { connect: { id: 18 } },
        comments: {
            create: {
                content: 'definitely buy!',
                user: { connect: { id: 0 } },
            }
        }
    },
    {
        title: "Can do no wrong!",
        content: 'Got this for my self and no compliants here!',
        rating: 5,
        user: { connect: { id: 0 } },
        equipment: { connect: { id: 27 } },
        comments: {
            create: {
                content: 'I love this! ',
                user: { connect: { id: 0 } },
            }
        }
    },
    {
        title: "Can do no wrong!",
        content: 'Got this for my self and no compliants here!',
        rating: 5,
        user: { connect: { id: 0 } },
        equipment: { connect: { id: 1 } },
        comments: {
            create: {
                content: 'The sets are GORGGG!',
                user: { connect: { id: 0 } },
            }
        }
    },
    {
        title: "Can do no wrong!",
        content: 'You need this!',
        rating: 5,
        user: { connect: { id: 0 } },
        equipment: { connect: { id: 11 } },
        comments: {
            create: {
                content: 'Cleans everything so well! ',
                user: { connect: { id: 0 } },
            }
        }
    },
    {
        title: "Can do no wrong!",
        content: 'You need this!',
        rating: 5,
        user: { connect: { id: 0 } },
        equipment: { connect: { id: 7 } },
        comments: {
            create: {
                content: 'Cleans everything so well! ',
                user: { connect: { id: 0 } },
            }
        }
    },
    {
        title: "Buy it right now!",
        content: 'I love this!',
        rating: 5,
        user: { connect: { id: 1 } },
        equipment: { connect: { id: 21 } },
        comments: {
            create: {
                content: 'definitely buy!',
                user: { connect: { id: 1 } },
            }
        }
    },
    {
        title: "Love this!",
        content: 'I use this so often, helps organize everything! super satisfying!',
        rating: 5,
        user: { connect: { id: 1 } },
        equipment: { connect: { id: 28 } },
        comments: {
            create: {
                content: 'definitely buy!',
                user: { connect: { id: 1 } },
            }
        }
    },
    {
        title: "Can do no wrong!",
        content: 'Always need some trash bags and these are so sturdy!',
        rating: 5,
        user: { connect: { id: 1 } },
        equipment: { connect: { id: 10 } },
        comments: {
            create: {
                content: 'I love this! ',
                user: { connect: { id: 1 } },
            }
        }
    },
    {
        title: "Soo good!",
        content: 'I bake almost everything on this!',
        rating: 5,
        user: { connect: { id: 1 } },
        equipment: { connect: { id: 16 } },
        comments: {
            create: {
                content: 'I love this! So durable and long lasting!',
                user: { connect: { id: 1 } },
            }
        }
    },
    {
        title: "Ahmazinggg!",
        content: 'I love this! I put one under everything',
        rating: 5,
        user: { connect: { id: 2 } },
        equipment: { connect: { id: 18 } },
        comments: {
            create: {
                content: 'definitely buy!',
                user: { connect: { id: 2 } },
            }
        }
    },
    {
        title: "Love this!",
        content: 'I use this so often',
        rating: 5,
        user: { connect: { id: 2 } },
        equipment: { connect: { id: 20 } },
        comments: {
            create: {
                content: 'Love using this product, definitely buy!',
                user: { connect: { id: 2 } },
            }
        }
    },
    {
        title: "Works even better!",
        content: `I love this more than Post 1's!`,
        rating: 5,
        user: { connect: { id: 3 } },
        equipment: { connect: { id: 5 } },
        comments: {
            create: {
                content: 'Keeps my counter from getting water stains from my water pitcher',
                user: { connect: { id: 3 } },
            }
        }
    },
    {
        title: "Love this!",
        content: 'I use this so often',
        rating: 5,
        user: { connect: { id: 3 } },
        equipment: { connect: { id: 17 } },
        comments: {
            create: {
                content: 'definitely buy!',
                user: { connect: { id: 3 } },
            }
        }
    },
]

module.exports = {posts};