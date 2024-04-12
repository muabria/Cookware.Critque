// TODO: seed the DB using Prisma
const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function seed() {
    console.log("Seeding the database.");
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.category.deleteMany();

    const randomUser = Math.floor(Math.random() * 10);

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

        // <------ BASIC EQUIPMENTS ------>

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

        const chefKnife = await prisma.equipment.create({
            data: {
                name: "Chef Kitchen Knife",
                description: " A versatile knife for chopping, slicing, and dicing.",
                image: "https://assets.wfcdn.com/im/72291186/resize-h445%5Ecompr-r85/2431/243198643/AIRPJ+21+Piece+Stainless+Steel+Knife+Block+Set.jpg",
                category: { connect: { id: basic.id } },
                brand: "Kitchen Aid, Walmart, Target, Amazon",
                purchaseLink: "https://www.wayfair.com/AIRPJ--AIRPJ-21-Piece-Stainless-Steel-Knife-Block-Set-USKS4-L3494-K~ARPJ1033.html?refid=GX490221400217-ARPJ1033&device=c&ptid=2018412487158&network=g&targetid=aud-1613017765086:pla-2018412487158&channel=GooglePLA&ireid=243198643&fdid=1817&gad_source=1&gbraid=0AAAAAD9ISC6E8pgMMotfw6V6396w_bXX8&gclid=Cj0KCQiAsburBhCIARIsAExmsu61CbmGX6h67XQsDwxTN-OBXkBZdPc0q0vycQvsgSsR2Tne3xVRINgaAqQwEALw_wcB",
                priceRating: 2
            },
            include: { category: true }
        })

        const cuttingBoard = await prisma.equipment.create({
            data: {
                name: "Cutting Board",
                description: "A non-porous surface for protecting your countertops and knives.",
                image: "https://www.ikea.com/us/en/images/products/proppmaett-cutting-board-beech__0523429_pe643788_s5.jpg?f=xl",
                category: { connect: { id: basic.id } },
                brand: "Ikea",
                purchaseLink: "https://www.ikea.com/us/en/p/proppmaett-cutting-board-beech-70233421/",
                priceRating: 1
            },
            include: { category: true }
        })

        const mixingBowl = await prisma.equipment.create({
            data: {
                name: "Mixing Bowl",
                description: "Various sizes for mixing ingredients, whisking, and marinating",
                image: "https://i.ebayimg.com/images/g/kQUAAOSwU1Rk036h/s-l1600.jpg",
                category: { connect: { id: basic.id } },
                brand: "Target, Amazon, FromOurPlace",
                purchaseLink: "https://fromourplace.com/products/ovenware-set?utm_source=google&utm_medium=pmax&utm_campaign=us_na_performance-max_ow_na&utm_content=&utm_version=1&gclid=Cj0KCQiAsburBhCIARIsAExmsu7M0H62Qy5kbtsr-j2kGbdHbYqEwMBsBufIqnd67bCf3N5AL1LgdSUaAp6KEALw_wcB&variant=42000766763202",
                priceRating: 4
            },
            include: { category: true }
        })

        const measuringCups = await prisma.equipment.create({
            data: {
                name: "Measuring Cup",
                description: "Accurate measuring is essential for successful cooking.",
                image: "https://m.media-amazon.com/images/I/71LQ0iJB9OL._AC_SL1500_.jpg",
                category: { connect: { id: basic.id } },
                brand: "Kitchen Aid, Walmart, Target, Amazon",
                purchaseLink: "https://www.amazon.com/Measuring-Cups-Set-Measurement-Ingredients/dp/B0C5XJPLGH/ref=sr_1_12?crid=3DDDBXWZPW2IL&keywords=measuring%2Bcups%2Bnude%2Bset&qid=1701829314&s=home-garden&sprefix=measuring%2Bcups%2Bnude%2Bset%2Cgarden%2C88&sr=1-12&th=1",
                priceRating: 2
            },
            include: { category: true }
        })


        // <------ CLEANING EQUIPMENTS ------>

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

        const bonAmi = await prisma.equipment.create({
            data: {
                name: "Bon Ami, Powder Cleanser",
                description: "Bon Ami - All Natural Powder Cleanser Kitchen & Bath",
                image: "https://m.media-amazon.com/images/I/61Zmt9jQX+L._AC_SL1000_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Kitchen Aid, Walmart, Target, Amazon",
                purchaseLink: "https://www.amazon.com/Bon-Ami-Natural-Cleanser-Kitchen/dp/B07VC36NMC/ref=sr_1_1?crid=3A6SDLV1RQVIX&keywords=bon+ami&qid=1700679177&sprefix=bon+ami%2Caps%2C164&sr=8-1",
                priceRating: 1
            },
            include: { category: true }
        })

        const dishSoapSponge = await prisma.equipment.create({
            data: {
                name: "Dish Soap + Sponge",
                description: "For cleaning dishes, utensils, and cookware.",
                image: "https://m.media-amazon.com/images/I/71YqdIu6PAL._AC_SL1500_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Ninja, Walmart, Target, Amazon",
                purchaseLink: "https://www.amazon.com/Arrow-Plastic-Sponge-Handle-Count/dp/B00WGX8HNG?th=1",
                priceRating: 1
            },
            include: { category: true }
        })

        const dishTowel = await prisma.equipment.create({
            data: {
                name: "Dish Towels",
                description: "For drying dishes and keeping your kitchen clean.",
                image: "https://m.media-amazon.com/images/I/71-tUVBNGfL._AC_SL1500_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Walmart, Target, Amazon",
                purchaseLink: "https://www.amazon.com/Homaxy-Cotton-Waffle-Kitchen-Absorbent/dp/B07WMQP4SF/ref=sr_1_4?crid=8G0UV9KXB5LV&keywords=dish+towels&qid=1701830407&s=home-garden&sprefix=dish+towels%2Cgarden%2C112&sr=1-4",
                priceRating: 1
            },
            include: { category: true }
        })

        const rubberGloves = await prisma.equipment.create({
            data: {
                name: "Rubber Gloves",
                description: "To protect your hands from hot water and harsh chemicals.",
                image: "https://m.media-amazon.com/images/I/61Td8R2fzIL._AC_SX679_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Amazon",
                purchaseLink: "https://www.amazon.com/URBANSEASONS-Dishwashing-Rubber-Gloves-Cleaning/dp/B07QWLGN4N",
                priceRating: 1
            },
            include: { category: true }
        })

        const trashCan = await prisma.equipment.create({
            data: {
                name: "Trash Can",
                description: "For disposing of food waste and packaging.",
                image: "https://m.media-amazon.com/images/I/61yHuoYNFTL._AC_SL1080_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Walmart, Target, Amazon",
                purchaseLink: "https://www.amazon.com/Plasticplace-T64155BK-Gallon-Liners-Garbage/dp/B08XY483SH?th=1",
                priceRating: 1
            },
            include: { category: true }
        })

        const allPurposeCleaner = await prisma.equipment.create({
            data: {
                name: "All Purpose Cleaner ",
                description: " For cleaning countertops, appliances, and other surfaces.",
                image: "https://m.media-amazon.com/images/I/81S7NjGk8ML._AC_SL1500_.jpg",
                category: { connect: { id: cleaning.id } },
                brand: "Local Stores, Walmart, Target, Amazon",
                purchaseLink: "https://www.target.com/p/clorox-disinfecting-all-purpose-cleaner-32-fl-oz/-/A-81428793",
                priceRating: 1
            },
            include: { category: true }
        })



        // <------ COOKING EQUIPMENTS ------>

        const parchmentPaperLiners = await prisma.equipment.create({
            data: {
                name: "Parchment Paper Liners",
                description: "pre-cut 7 inch round air fryer parchment paper liners are suitable for most air fryers on the market and can be used for baking, frying, grilling and so on. ",
                image: "https://m.media-amazon.com/images/I/719evGmaCGL._AC_SL1500_.jpg",
                category: { connect: { id: cooking.id } },
                brand: "Numola",
                purchaseLink: "https://www.amazon.com/Numola-Perforated-Parchment-Compatible-3-4-3-7qt/dp/B08HYSXT9G?pd_rd_w=SI5fH&content-id=amzn1.sym.d1bf6bee-b588-4538-8422-ca1ad75c6390&pf_rd_p=d1bf6bee-b588-4538-8422-ca1ad75c6390&pf_rd_r=SMK5ST66K45MF0R6G5G1&pd_rd_wg=nGRZk&pd_rd_r=3f8cf1da-807d-4631-b3a4-df7cfa6cc4db&pd_rd_i=B08HYSXT9G&ref_=pd_bap_d_grid_rp_0_30_t&th=1",
                priceRating: 4
            },
            include: { category: true }
        })

        const stockPot = await prisma.equipment.create({
            data: {
                name: "Stock Pot",
                description: "A large pot for boiling water, making stock, and cooking pasta.",
                image: "https://cdn.shopify.com/s/files/1/0024/4137/9915/files/Perfect_Pot_-_Steam.jpg?crop=center&height=1376&v=1665445958&width=1376",
                category: { connect: { id: cooking.id } },
                brand: "FromOurPlace, Amazon, Ninja",
                purchaseLink: "https://fromourplace.com/products/perfect-pot?variant=40452807164098",
                priceRating: 4
            },
            include: { category: true }
        })

        const sautéPan = await prisma.equipment.create({
            data: {
                name: "Sauté Pan",
                description: "A versatile pan for frying, sautéing, and searing.",
                image: "https://cdn.shopify.com/s/files/1/0024/4137/9915/products/AP_Sage_1.png?crop=center&height=1376&v=1691170483&width=1376",
                category: { connect: { id: cooking.id } },
                brand: "FromOurPlace",
                purchaseLink: "https://fromourplace.com/products/large-always-pan?variant=43413983002818",
                priceRating: 4
            },
            include: { category: true }
        })
        const castIronSkillet = await prisma.equipment.create({
            data: {
                name: "Cast Iron Skillet",
                description: "Great for browning meat, baking, and cooking cornbread.",
                image: "https://cdn.shopify.com/s/files/1/0024/4137/9915/files/Cast_Iron_Always_Pan_-_Spice.jpg?crop=center&height=1376&v=1665445939&width=1376",
                category: { connect: { id: cooking.id } },
                brand: "FromOurPlace",
                purchaseLink: "https://fromourplace.com/products/cast-iron-always-pan?_pos=1&_psq=cast&_ss=e&_v=1.0&variant=41793891008706",
                priceRating: 4
            },
            include: { category: true }
        })

        const bakingSheet = await prisma.equipment.create({
            data: {
                name: "Baking Sheet",
                description: "For roasting vegetables, baking cookies, and making sheet pan dinners.",
                image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SL1500_.jpg",
                category: { connect: { id: cooking.id } },
                brand: "Amazon, Target, Walmart",
                purchaseLink: "https://www.amazon.com/AmazonBasics-6-Piece-Nonstick-Bakeware-Baking/dp/B0764M2JXY/ref=asc_df_B0764M2JXY/?tag=hyprod-20&linkCode=df0&hvadid=242037870479&hvpos=&hvnetw=g&hvrand=577389597990627233&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9129397&hvtargid=pla-469595491127&psc=1&mcid=3a99dd76f209390b9de4b2f849676968&gclid=Cj0KCQiAsburBhCIARIsAExmsu6_ODvsvoW9jHzjOGxlEU4I_R_6mSCZtLYcAclSu8e0bZK1xVOzGVEaAjdbEALw_wcB",
                priceRating: 2
            },
            include: { category: true }
        })


        // <------ GADGET EQUIPMENTS ------>

        const Mandolin = await prisma.equipment.create({
            data: {
                name: "Mandolin",
                description: "The Mandolin is a tool usually has a couple of blade options and can slice vegetables as thin as paper. It can also julienne veggies and, with the turn of the mechanism, cut French fry potatoes.",
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
                image: "https://m.media-amazon.com/images/I/61Y1g4jMIsL._AC_SL1001_.jpg",
                category: { connect: { id: gadgets.id } },
                brand: "Vitamix, Kitchen Aid",
                purchaseLink: "https://www.vitamix.com/us/en_us/shop/5200-getting-started?cjdata=MXxOfDB8WXww&COUPON=06-373&cjdata=MXxOfDB8WXww&cjevent=07e10d84881211ee830804dd0a82b82d&CID=aff",
                priceRating: 4.5
            },
            include: { category: true }
        })
        const handBlender = await prisma.equipment.create({
            data: {
                name: "Hand Blender",
                description: "Designed for the perfect puree, you can blend everything from smoothies, to milk shakes, soups, sauces and so much more.",
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
                description: "It can be used to grind your coffee beans or toasted whole spices for ultimately fresh spice flavors that can be added to your recipes.",
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
                description: "A juicer is a great tool for squeezing all the basics like lemon, lime, and orange juice when called for in multiple recipes!!",
                image: "https://www.foodandwine.com/thmb/4SOH_P7cWin0hb7tKCGTklia-R4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Best-Cold-Press-Juicers-Tested-FW-Social-d23056545dd44c33814aecbc32f8bfee.jpg",
                category: { connect: { id: gadgets.id } },
                brand: "Ninja, Nutri Bullet",
                purchaseLink: "https://www.nutribullet.com/shop/juicers/nutribullet-juicer-pro/?gad_source=1&gclid=Cj0KCQiAsburBhCIARIsAExmsu7PWdIHiAer2urhVFSQQqajeOz_GYa7OP2tSrrJAAghlG8A_76R8i4aAmEtEALw_wcB",
                priceRating: 3
            },
            include: { category: true }
        })



        // <------ MISCELLANEOUS EQUIPMENTS ------>

        const pastaServer = await prisma.equipment.create({
            data: {
                name: "Curve Handle Pasta Server",
                description: "Tools are designed to lie flat on the countertop and will not roll, Nylon heads on tools are heat resistant up to 400-Degree Fahrenheit",
                image: "https://m.media-amazon.com/images/I/61GOqhhQiyL._AC_SL1500_.jpg",
                category: { connect: { id: miscellaneous.id } },
                brand: "Amazon",
                purchaseLink: "https://www.amazon.com/Cuisinart-CTG-01-PS-Curve-Handle-Server/dp/B004YZEIMS/ref=sr_1_1?crid=3AI2JR8NI1U3K&keywords=pasta%2Bspoon&qid=1700679440&sprefix=pasta%2Bspoon%2Caps%2C133&sr=8-1&th=1",
                priceRating: 2
            },
            include: { category: true }
        })

        const canOpener = await prisma.equipment.create({
            data: {
                name: "Can Opener",
                description: "For opening canned food.",
                image: "https://cb.scene7.com/is/image/Crate/OXOCanOpenerBlackAVSSS21_VND/$web_pdp_main_carousel_high$/210413142448/oxo-good-grips-can-opener.jpg",
                category: { connect: { id: miscellaneous.id } },
                brand: "Crate + Barrel, Ninja",
                purchaseLink: "https://www.crateandbarrel.com/oxo-good-grips-can-opener/s643572",
                priceRating: 2
            },
            include: { category: true }
        })

        const garlicPress = await prisma.equipment.create({
            data: {
                name: "Garlic Presser",
                description: "For mincing garlic quickly and easily.",
                image: "https://www.kroger.com/product/images/thumbnail/front/0064463719119",
                category: { connect: { id: miscellaneous.id } },
                brand: "Ninja",
                purchaseLink: "",
                priceRating: 2
            },
            include: { category: true }
        })

        const boxGrater = await prisma.equipment.create({
            data: {
                name: "Box Grater",
                description: "For shredding cheese, vegetables, and chocolate.",
                image: "https://m.media-amazon.com/images/I/71ali47MlZL._AC_SL1500_.jpg",
                category: { connect: { id: miscellaneous.id } },
                brand: "Amazon, Ninja",
                purchaseLink: "https://www.amazon.com/Gorilla-Grip-Detachable-Comfortable-Vegetables/dp/B08FK2HZ8D/ref=sr_1_2_sspa?crid=2EVM4IP1HR7RN&keywords=box%2Bgrater&qid=1701830288&s=home-garden&sprefix=box%2Bgrater%2Cgarden%2C100&sr=1-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
                priceRating: 1
            },
            include: { category: true }
        })

        const whisk = await prisma.equipment.create({
            data: {
                name: "Whisk",
                description: "For whipping cream, beating eggs, and making sauces.",
                image: "https://m.media-amazon.com/images/I/81QiauSTQzL._AC_SL1500_.jpg",
                category: { connect: { id: miscellaneous.id } },
                brand: "Amazon, Target, Ninja",
                purchaseLink: "https://www.amazon.com/AmazonBasics-Stainless-Steel-Wire-Whisk/dp/B07TMHKV74/ref=sr_1_1_ffob_sspa?crid=2B34ZFDNXI0SV&keywords=whisk&qid=1701830252&s=home-garden&sprefix=whisk+%2Cgarden%2C104&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
                priceRating: 1
            },
            include: { category: true }
        })

        const kitchenTimer = await prisma.equipment.create({
            data: {
                name: "Kitchen Timer",
                description: "To keep track of cooking times and prevent overcooked dishes.",
                image: "https://m.media-amazon.com/images/I/51budipuuhL._SL1080_.jpg",
                category: { connect: { id: miscellaneous.id } },
                brand: "Amazon, Target, Ninja",
                purchaseLink: "https://www.amazon.com/Mechanical-Processing-Classroom-Activities-Timeouts/dp/B007UO4SAW/ref=sr_1_2_sspa?crid=1JWQW8CCUWOBD&keywords=kitchen+timer&qid=1701830208&s=home-garden&sprefix=kitchen+timer%2Cgarden%2C114&sr=1-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
                priceRating: 1
            },
            include: { category: true }
        })



        // <------ STORAGE EQUIPMENTS ------>

        const pantryContainer = await prisma.equipment.create({
            data: {
                name: "Pantry Shelf/Containers",
                description: "If you cannot renovate, simply add baskets to the shelves so that you can pull them out to access what is in the back. You can also Purcahse Pantry storage based containers to use as storage for you.",
                image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/project%20prism%2Fcolor%20search%20archive%2Fa54c4855e6b1c7a66c738fd7be85d7a7b1cb503d",
                category: { connect: { id: storage.id } },
                brand: "Amazon, Target, IKEA, Walmart",
                purchaseLink: "https://www.amazon.com/Utopia-Kitchen-Storage-Organizer-Stackable/dp/B08BGZ9N5T/ref=asc_df_B08BGZ9N5T/?tag=hyprod-20&linkCode=df0&hvadid=475910126825&hvpos=&hvnetw=g&hvrand=3909969225002768887&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9129397&hvtargid=pla-1027901244841&mcid=b21907cbd33431d994aebd3f925f00f0&gclid=Cj0KCQiAsburBhCIARIsAExmsu7Wa7AbZeQGtsrpOmg3KREayoUwtUl1CKJt1_1utwYBEOSsh34uKQ0aAkJHEALw_wcB&th=1",
                priceRating: 1
            },
            include: { category: true }
        })

        const airtightContainer = await prisma.equipment.create({
            data: {
                name: "Air Tight Container",
                description: "For storing dry goods, leftovers, and prepped ingredients.",
                image: "https://m.media-amazon.com/images/I/617clEP1jWS._AC_SL1000_.jpg",
                category: { connect: { id: storage.id } },
                brand: "Ninja, Target, Amazon",
                purchaseLink: "https://www.amazon.com/Airtight-Food-Storage-Containers-Lids/dp/B08YQNLYF9?th=1",
                priceRating: 2
            },
            include: { category: true }
        })

        const zipTopBags = await prisma.equipment.create({
            data: {
                name: "Zip Top Bags",
                description: "For freezing food, storing snacks, and marinating",
                image: "https://m.media-amazon.com/images/I/71C03SGUCAL._AC_SL1500_.jpg",
                category: { connect: { id: storage.id } },
                brand: "Amazon",
                purchaseLink: "https://www.amazon.com/Zip-Top-Reusable-Platinum-Containers/dp/B07T38ZF3B?th=1",
                priceRating: 3
            },
            include: { category: true }
        })

        const aluminumFoil = await prisma.equipment.create({
            data: {
                name: "Aluminum Foil",
                description: "For wrapping food, covering bowls, and lining baking sheets",
                image: "https://www.rd.com/wp-content/uploads/2021/08/GettyImages-186874895-scaled-e1629406266878.jpg?resize=1536%2C1024",
                category: { connect: { id: storage.id } },
                brand: "Target",
                purchaseLink: "https://www.target.com/p/reynolds-wrap-heavy-duty-aluminum-foil-130-sq-ft/-/A-47976048?ref=tgt_adv_xsp&AFID=google&fndsrc=tgtao&DFA=71700000049427608&CPNG=PLA_Household%2BEssentials%2BShopping_Local%7CHousehold%2BEssentials_Ecomm_Essentials&adgroup=SC_Household&LID=700000001170770pgs&LNM=PRODUCT_GROUP&network=g&device=c&location=9060351&targetid=aud-554348707579:pla-625884598722&ds_rl=1246978&gad_source=1&gclid=Cj0KCQiAsburBhCIARIsAExmsu6fMpTn-_D2ewymLiiQ5ZIYWzEHDAH_yDvVbiDymIvQU4C61xj_25IaAoCGEALw_wcB&gclsrc=aw.ds",
                priceRating: 1
            },
            include: { category: true }
        })

        const glassJar = await prisma.equipment.create({
            data: {
                name: "Glass Jars",
                description: "For storing spices, herbs, and homemade jams.",
                image: "https://cdnimg.webstaurantstore.com/images/products/large/592230/2454581.jpg",
                category: { connect: { id: storage.id } },
                brand: "Ninja",
                purchaseLink: "",
                priceRating: 2
            },
            include: { category: true }
        })

        //<-------------------------------- USERS -------------------------------->

        const marisa = await prisma.user.create({
            data: {
                username: 'mvandell',
                email: 'marisavandellos@gmail.com',
                password: bcrypt.hashSync("MyF@vor1te", SALT_COUNT),
                isAdmin: true,
            },

        })

        const brianna = await prisma.user.create({
            data: {
                username: 'muabria',
                email: 'email@email.com',
                password: bcrypt.hashSync("F@ncySh0es", SALT_COUNT),
                isAdmin: true,
            },

        })

        const henrietta = await prisma.user.create({
            data: {
                username: 'mizhenn',
                email: 'email@email.com',
                password: bcrypt.hashSync("Ded1c@tion", SALT_COUNT),
                isAdmin: true,
            },

        })

        const kat = await prisma.user.create({
            data: {
                username: 'katc336',
                email: 'email@email.com',
                password: bcrypt.hashSync("De$ignCentra1", SALT_COUNT),
                isAdmin: true,
            },

        })

        for (let i = 0; i < 6; i++) { //fake users
            users.push({
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: bcrypt.hashSync(faker.internet.password({length: 10}), SALT_COUNT),
                    isAdmin: faker.datatype.boolean({probability: 0.2}),
                })
        };

        //<-------------------------------- POST/COMMENT ENTRIES -------------------------------->

        //<----------------------- BASIC -------------------------->

        // <------ TRIVET ------>

        const trivet1 = await prisma.post.create({
            data: {
                title: "Works great!",
                content: "This cork trivet has become a staple in my kitchen for its superb heat resistance and eco-friendly qualities. The cork material is of high quality and provides a sturdy base for hot pots and pans. However, the smaller size of the trivet limits its usability for larger cookware. Overall, I would rate this cork trivet a 3 out of 5 for its durability and eco-friendliness.",
                rating: 3,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: trivet.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water stains from my water pitcher',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const trivet2 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: "I'm loving this cork trivet for its excellent heat resistance and stylish design. It fits perfectly in my kitchen decor and has proven to be a reliable tool for protecting my countertops. The only downside is that the cork material tends to absorb liquids and stains easily, requiring frequent cleaning. Despite this, I would still give this cork trivet a solid 4 out of 5 for its functionality and aesthetics.",
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: trivet.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const trivet3 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "This cork trivet has been a pleasant addition to my kitchen, providing reliable heat resistance and a sleek design. The eco-friendly nature of cork is a big plus for me, and the trivet's compact size makes it easy to store. However, I've noticed that the cork tends to discolor over time with regular use. Taking this into account, I would rate this cork trivet a 3 out of 5 for its functionality and eco-friendliness.",
                rating: 3,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: trivet.id } },
                comments: {
                    create: {
                        content: '',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const trivet4 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "I've been using this cork trivet for a while now and have been impressed with its heat resistance and overall durability. The minimalist design blends well with my kitchen decor, and the trivet has held up well to daily use. My only issue is that the cork material can sometimes give off a slight odor, especially when exposed to heat. Despite this, I would still give this cork trivet a 4 out of 5 for its quality and design.",
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: trivet.id } },
                comments: {
                    create: {
                        content: 'I love this! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const trivet5 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "This cork trivet has been a game-changer in my kitchen, providing excellent heat resistance and a stylish touch to my countertop. The eco-friendly aspect of cork is a major selling point for me, and the trivet's compact size is perfect for smaller pots and pans. However, the cork material tends to stain easily and requires frequent cleaning to maintain its appearance. Despite this minor inconvenience, I would rate this cork trivet a solid 4 out of 5 for its functionality and aesthetics.",
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: trivet.id } },
                comments: {
                    create: {
                        content: 'The sets are GORGGG!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
// <------ KNIFE ------>
        const knife1 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "This chef's knife is perfect for all my cooking needs. The sharp blade cuts through vegetables and meats effortlessly, making meal prep a breeze.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: chefKnife.id } },
                comments: {
                    create: {
                        content: 'Cuts everything so well! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const knife2 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "I love the balance of this chef's knife - it's comfortable to hold and easy to control. I feel like a professional chef every time I use it!",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: chefKnife.id } },
                comments: {
                    create: {
                        content: 'Works so well! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const knife3 = await prisma.post.create({
            data: {
                title: "Buy it right now!",
                content: "I have been nothing short of impressed with this chef's knife. The sharp blade effortlessly slices through all types of ingredients, making meal prep a breeze. The balance and comfort of the knife are unmatched, allowing for precise cuts and control while cooking. It truly feels like a professional-quality knife that enhances my cooking experience. The durability of the blade is also outstanding, remaining sharp even after frequent use. I highly recommend this chef's knife to anyone looking for a reliable and high-quality kitchen tool.",
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: chefKnife.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const knife4 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: "The quality of this chef's knife is top-notch. It has stayed sharp even after multiple uses, and I appreciate the durability of the blade.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: chefKnife.id } },
                comments: {
                    create: {
                        content: 'Great!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
// <------ CUTTING BOARD ------>   
        const cutting1 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "I absolutely love this cutting board! It's spacious enough to chop a variety of ingredients, and the non-slip edges keep it in place on my countertop.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: cuttingBoard.id } },
                comments: {
                    create: {
                        content: 'I love this! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const cutting2 = await prisma.post.create({
            data: {
                title: "Soo good!",
                content: 'I cannot say enough good things about this cutting board. Its spacious design allows for easy chopping and slicing of various ingredients, while the non-slip edges keep it securely in place on my countertop. The high-quality material is not only durable but also knife-friendly, ensuring that my knives stay sharp even after prolonged use. I appreciate how easy it is to clean and maintain, making it a practical and essential kitchen item. Overall, this cutting board has become a staple in my cooking routine, and I would highly recommend it to others.',
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: cuttingBoard.id } },
                comments: {
                    create: {
                        content: 'I love this! So durable and long lasting!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const cutting3 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "The material of this cutting board is high-quality and easy to clean. I appreciate that it doesn't dull my knives like other cutting boards I've used in the past.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: cuttingBoard.id } },
                comments: {
                    create: {
                        content: 'I love this! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const cutting4 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "This cutting board is a kitchen essential. It's sturdy, doesn't warp over time, and has become a staple in my meal preparation routine.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: cuttingBoard.id } },
                comments: {
                    create: {
                        content: '',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
//<------ MIXING BOWL ------>
        const mixing1 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: "This mixing bowl is perfect for all my baking needs. It's lightweight yet durable, and the non-slip base prevents it from sliding around on my countertops.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: mixingBowl.id } },
                comments: {
                    create: {
                        content: 'Perfect',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
        const mixing2 = await prisma.post.create({
            data: {
                title: "Ahmazinggg!",
                content: "I love the size of this mixing bowl - it's large enough to mix ingredients for a big batch of cookies or cake batter. The handle also makes it easy to hold and pour.",
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: mixingBowl.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const mixing3 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'This mixing bowl has exceeded my expectations in every way. Its lightweight yet durable construction makes it perfect for all my baking needs. The non-slip base ensures stability during mixing, while the handle makes it easy to hold and pour. The size is ideal for preparing large batches of dough or batter, and the dishwasher-safe feature simplifies cleaning up after baking. The quality of this mixing bowl is outstanding, and it has quickly become one of my favorite kitchen tools. I cannot imagine baking without it, and I highly recommend it to anyone in need of a reliable and versatile mixing bowl.',
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: mixingBowl.id } },
                comments: {
                    create: {
                        content: 'Love using this product, definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const mixing4 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: "The quality of this mixing bowl is unbeatable. It's dishwasher-safe, which makes cleanup a breeze, and the smooth surface doesn't retain odors or stains.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: mixingBowl.id } },
                comments: {
                    create: {
                        content: 'Definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
//<------ MEASURING CUPS ------>
        const measure1 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: "These measuring cups are a kitchen essential. The different sizes make it easy to measure out ingredients accurately, and the durable construction ensures they'll last for years.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: measuringCups.id } },
                comments: {
                    create: {
                        content: 'Definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const measure2 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: "I appreciate the clear measurement markings on these cups, as it makes it easy to see the exact amount of ingredients I'm adding. The nesting design also saves space in my kitchen.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: measuringCups.id } },
                comments: {
                    create: {
                        content: 'Definitely buy! Measures so well! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const measure3 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: "The material of these measuring cups is high-quality and easy to clean. They're a must-have for any home cook or baker.",
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: measuringCups.id } },
                comments: {
                    create: {
                        content: 'If you love to be organized...Definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
        const measure4 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I absolutely love my new set of measuring cups! They are sturdy and well-made, and the measurements are clear and easy to read. The different sizes are perfect for all my baking and cooking needs, from measuring out ingredients for a cake to accurately portioning out rice for dinner. The cups also have a handy pour spout, which makes transferring liquids a breeze. Overall, I couldn't be happier with this purchase and would highly recommend these measuring cups to anyone in need of a reliable set for their kitchen.`,
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: measuringCups.id } },
                comments: {
                    create: {
                        content: '',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const measure5 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'These measuring cups are a game-changer in my kitchen! The cups are made of durable material that feels like they will last a long time, even with daily use. The measurements are accurate, allowing me to confidently follow recipes without worrying about getting the proportions wrong. The cups are also easy to clean, either by hand or in the dishwasher, which is a huge plus for me. I appreciate the thoughtful design of these measuring cups, and I will definitely be reaching for them every time I cook or bake.',
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: Mandolin.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const measure6 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I am so impressed with the quality of these measuring cups! Not only are they well-made and sturdy, but they also stack neatly inside each other, saving me valuable storage space in my kitchen. The measurements are easy to read, and the handles are comfortable to hold, making them a pleasure to use. I also appreciate that the measurements are engraved on the cups, meaning they won't fade or wear off over time. These measuring cups have quickly become an essential tool in my kitchen, and I can't imagine cooking without them now. Highly recommend this set to anyone looking for reliable and efficient measuring cups.`,
                rating: 4,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: cuttingBoard.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })
//<----------------------- CLEANING -------------------------->
//<------ DOBIE ------>
        const dobie1 = await prisma.post.create({
            data: {
                title: "Works great!",
                content: `Quite Efficient!`,
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: dobie.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water and food stains',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const dobie2 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I love this!!`,
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: dobie.id } },
                comments: {
                    create: {
                        content: 'I feel like Betty Crocker herself when using a Stock Pot! Food comes out ahhmazingg! ',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const dobie3 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I love this!!`,
                rating: 5,
                user: { connect: { id: randomUser } },
                equipment: { connect: { id: dobie.id } },
                comments: {
                    create: {
                        content: 'Wrap all types of my food with this. Can do no wrong with having in the kitchen!',
                        user: { connect: { id: randomUser } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

//<----------------------- COOKING -------------------------->
//<------ PARCHMENT PAPER LINERS ------>
const parchment1 = await prisma.post.create({
    data: {
        title: "Works even better!",
        content: `Parchment paper liners are a game-changer for baking enthusiasts! The convenience they offer cannot be overstated. Not only do they prevent sticking and ensure easy cleanup, but they also help in creating beautifully baked goods with evenly distributed heat. From cookies to pastries, using parchment paper liners guarantees a perfect result every time. While they may seem like a small addition to the kitchen, their impact is significant, earning them a solid four-star rating.`,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: parchmentPaperLiners.id } },
        comments: {
            create: {
                content: 'Comes in different sizes, too',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
const parchment2 = await prisma.post.create({
    data: {
        title: "Amazing",
        content: `Parchment paper liners are an absolute kitchen essential! They make baking a breeze, preventing sticking and ensuring even cooking. The convenience they offer is unparalleled; no more scrubbing pans for hours. Plus, they're versatile enough to be used for lining trays, wrapping food for steaming, and even crafting homemade piping bags. With their affordable price and time-saving benefits, parchment paper liners easily earn a solid four-star rating.`,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: parchmentPaperLiners.id } },
        comments: {
            create: {
                content: 'Agreed!',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
const parchment3 = await prisma.post.create({
    data: {
        title: "Solid",
        content: `Parchment paper liners are a handy tool to have in the kitchen, especially for those who love to bake. They certainly make cleanup a breeze and help prevent food from sticking to the pan. However, the quality can vary, and sometimes they tear easily, which can be frustrating. While they serve their purpose adequately, there may be room for improvement in terms of durability. Overall, a decent option for baking needs, deserving of a three-star rating.`,
        rating: 3,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: parchmentPaperLiners.id } },
        comments: {
            create: {
                content: 'Mine are sturdy enough',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
//<------ STOCK POT ------>
const stock1 = await prisma.post.create({
    data: {
        title: "Love it!",
        content: `The stock pot is the unsung hero of the kitchen. Whether you're simmering soups, boiling pasta, or brewing a hearty broth, this versatile vessel delivers every time. Its spacious capacity and sturdy construction make it a must-have for home chefs and professional cooks alike. From family dinners to entertaining guests, the stock pot never fails to impress. With its durability, functionality, and endless culinary possibilities, it deserves a glowing five-star rating.`,
        rating: 5,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: stockPot.id } },
        comments: {
            create: {
                content: 'Works great',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
const stock2 = await prisma.post.create({
    data: {
        title: "Awesome",
        content: `The stock pot is an absolute lifesaver in the kitchen! Its generous size and durable construction make it perfect for cooking large batches of soups, stews, and stocks. Whether I'm feeding a crowd or meal prepping for the week, the stock pot always delivers. The even heat distribution ensures that everything cooks evenly, and the sturdy handles make it easy to maneuver, even when full. A must-have for any serious home cook, deserving of a five-star rating without a doubt.`,
        rating: 5,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: stockPot.id } },
        comments: {
            create: {
                content: 'Same',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
const stock3 = await prisma.post.create({
    data: {
        title: "Works well",
        content: `The stock pot is a versatile addition to any kitchen arsenal. Its large capacity and sturdy build make it ideal for boiling pasta, simmering soups, and preparing stocks. While it may not be the most exciting piece of cookware, its functionality cannot be denied. However, the weight of the pot, especially when full, can make it a bit cumbersome to handle. Despite this minor inconvenience, its performance and durability warrant a solid four-star rating.`,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: stockPot.id } },
        comments: {
            create: {
                content: 'I feel like Betty Crocker herself when using a Stock Pot! Food comes out ahhmazingg! ',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
//<------ SAUTE PAN ------>
const saute1 = await prisma.post.create({
    data: {
        title: "Works great!",
        content: `The saute pan is a versatile workhorse in any kitchen. Its wide, flat base and high, straight sides make it perfect for everything from searing meats to sautéing vegetables. The even heat distribution ensures consistent cooking, while the non-stick surface makes cleanup a breeze. Whether you're whipping up a quick weeknight stir-fry or preparing a gourmet feast, the saute pan delivers reliable results every time. While it may not have the flashy appeal of other cookware, its practicality and performance earn it a solid four-star rating.`,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: sautéPan.id } },
        comments: {
            create: {
                content: '5 stars!',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})

const saute2 = await prisma.post.create({
    data: {
        title: "Works even better!",
        content: `The saute pan is a workhorse in my kitchen, perfect for everything from quick weekday meals to gourmet dinner parties. Its spacious cooking surface and high sides make it versatile enough for sautéing vegetables, searing meats, or even making sauces. The non-stick coating ensures easy cleanup, while the sturdy construction guarantees even heat distribution. While it may not be the most glamorous piece of cookware, its reliability and performance earn it a solid four-star rating. `,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: sautéPan.id } },
        comments: {
            create: {
                content: 'I have no problems with mine',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})

const saute3 = await prisma.post.create({
    data: {
        title: "Perfection",
        content: `The saute pan is a kitchen essential that I simply cannot live without! Its versatility and durability make it perfect for a wide range of cooking tasks, from stir-frying to braising. The non-stick surface ensures that food slides right off, making cleanup a breeze. Plus, the heat-resistant handle provides a comfortable grip, even when cooking for extended periods. Whether I'm cooking for myself or entertaining guests, the saute pan always delivers flawless results. Deserving of a glowing five-star rating without question. `,
        rating: 5,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: sautéPan.id } },
        comments: {
            create: {
                content: 'For real?',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
//<------ CAST IRON SKILLET ------>
const iron1 = await prisma.post.create({
    data: {
        title: "Works great!",
        content: `The cast iron skillet is a kitchen classic that never fails to impress. Its ability to retain and distribute heat evenly makes it perfect for achieving that perfect sear on steaks or baking golden cornbread. With proper care, it develops a natural non-stick surface that only gets better with time. While it requires a bit of maintenance, the results are well worth the effort. A versatile and durable piece of cookware that earns a solid four-star rating.`,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: castIronSkillet.id } },
        comments: {
            create: {
                content: 'I feel the same way',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})

const iron2 = await prisma.post.create({
    data: {
        title: "Great",
        content: `The cast iron skillet is the ultimate kitchen workhorse, earning a perfect five-star rating without hesitation. Its unparalleled heat retention and distribution make it ideal for achieving that perfect sear on steaks, frying crispy bacon, or baking golden cornbread. From stovetop to oven, this durable piece of cookware can handle it all. With proper care, it only gets better with age, developing a naturally non-stick surface that enhances cooking with every use. Whether you're a seasoned chef or a novice cook, the cast iron skillet is a timeless kitchen essential that will never let you down.`,
        rating: 5,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: castIronSkillet.id } },
        comments: {
            create: {
                content: 'I feel like an American! Food comes out ahhmazingg! ',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})

const iron3 = await prisma.post.create({
    data: {
        title: "Works even better!",
        content: `The cast iron skillet is hands down my favorite piece of cookware in the kitchen! Its versatility knows no bounds, from frying eggs to baking desserts. The even heat distribution ensures that food cooks evenly every time, while the durable construction means it will last a lifetime with proper care. Whether I'm cooking breakfast, lunch, or dinner, the cast iron skillet never disappoints. A true kitchen essential that deserves a glowing five-star rating.`,
        rating: 5,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: castIronSkillet.id } },
        comments: {
            create: {
                content: 'Perfect',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
//<------ BAKING SHEET ------>
const baking1 = await prisma.post.create({
    data: {
        title: "Works great!",
        content: `The baking sheet is a staple in every kitchen, offering endless possibilities for creating delicious baked goods and savory treats. Its flat surface and raised edges make it perfect for baking cookies, roasting vegetables, or toasting nuts. Made from durable materials like aluminum or stainless steel, it withstands high temperatures and ensures even cooking every time. While it may not be the flashiest piece of kitchen equipment, its versatility and reliability earn it a solid four-star rating. Whether you're a baking enthusiast or just starting out, a quality baking sheet is a must-have for any culinary adventure. `,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: bakingSheet.id } },
        comments: {
            create: {
                content: 'Works well',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})

const baking2 = await prisma.post.create({
    data: {
        title: "Works even better!",
        content: `The baking sheet is a staple in my kitchen for its versatility and reliability. Whether I'm baking cookies, roasting vegetables, or toasting nuts, it consistently delivers excellent results. The raised edges prevent spills and make it easy to transfer food in and out of the oven. While it may not be the most glamorous piece of equipment, its practicality makes it indispensable. A solid four-star rating for its consistent performance.`,
        rating: 4,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: bakingSheet.id } },
        comments: {
            create: {
                content: 'I feel like Betty Crocker herself when using a baking sheet! Food comes out ahhmazingg! ',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})

const baking3 = await prisma.post.create({
    data: {
        title: "OK",
        content: `The baking sheet is a functional piece of kitchen equipment that gets the job done. Its flat surface and raised edges make it suitable for a variety of baking and roasting tasks. However, I've found that some baking sheets tend to warp over time, which can affect baking results. While they're affordable and widely available, the durability could be improved. Overall, a decent option for basic baking needs, deserving of a three-star rating.`,
        rating: 3,
        user: { connect: { id: randomUser } },
        equipment: { connect: { id: bakingSheet.id } },
        comments: {
            create: {
                content: 'This is my favorite baking sheet',
                user: { connect: { id: randomUser } },
            }
        }
    },
    include: { user: true, equipment: true }
})
//<----------------------- GADGET -------------------------->


//<----------------------- MISCELLANEOUS -------------------------->



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