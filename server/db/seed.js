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

        // const test5 = await prisma.equipment.create({
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

        // <------ MARISA COMMENTS ------>

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
                title: "Love this!",
                content: 'I use this so often',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: blender.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post3 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'I love this! I am always investing in a set!',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: glassJar.id } },
                comments: {
                    create: {
                        content: 'I store all my veggies in my jars! I will save my broth, steams, sliced, diced you name it I am storing it!',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post4 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'Got this for my self and no compliants here!',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: kitchenTimer.id } },
                comments: {
                    create: {
                        content: 'I love this! ',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post5 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'Got this for my self and no compliants here!',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: chefKnife.id } },
                comments: {
                    create: {
                        content: 'The sets are GORGGG!',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post6 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'You need this!',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: allPurposeCleaner.id } },
                comments: {
                    create: {
                        content: 'Cleans everything so well! ',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post7 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'You need this!',
                rating: 5,
                user: { connect: { id: marisa.id } },
                equipment: { connect: { id: dishSoapSponge.id } },
                comments: {
                    create: {
                        content: 'Cleans everything so well! ',
                        user: { connect: { id: marisa.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })





        // <------ BRIANNA COMMENTS ------>

        const post8 = await prisma.post.create({
            data: {
                title: "Buy it right now!",
                content: 'I love this!',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: juicer.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post9 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'I use this so often, helps organize everything! super satisfying!',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: pantryContainer.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post10 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'Always need some trash bags and these are so sturdy!',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: trashCan.id } },
                comments: {
                    create: {
                        content: 'I love this! ',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post11 = await prisma.post.create({
            data: {
                title: "Soo good!",
                content: 'I bake almost everything on this!',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: bakingSheet.id } },
                comments: {
                    create: {
                        content: 'I love this! So durable and long lasting!',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post12 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'I feel like betty crocker herself when using my mixing bowl!',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: mixingBowl.id } },
                comments: {
                    create: {
                        content: 'I love this! ',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post13 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'I feel like betty crocker herself!',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: castIronSkillet.id } },
                comments: {
                    create: {
                        content: 'I love this! Makes the meat so nice and tender! Got it during black friday in love already!!',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post14 = await prisma.post.create({
            data: {
                title: "Can do no wrong!",
                content: 'This is perfect for your oven or airfryer',
                rating: 5,
                user: { connect: { id: brianna.id } },
                equipment: { connect: { id: parchmentPaperLiners.id } },
                comments: {
                    create: {
                        content: 'Perfect to use inside your Oven + Airfryer',
                        user: { connect: { id: brianna.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        // <------ HENRIETTA COMMENTS ------>

        const post15 = await prisma.post.create({
            data: {
                title: "Ahmazinggg!",
                content: 'I love this! I put one under everything',
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: handBlender.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post16 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'I use this so often',
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: foodProcessor.id } },
                comments: {
                    create: {
                        content: 'Love using this product, definitely buy!',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post17 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'If you love to organize this is the perfect product for you!',
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: zipTopBags.id } },
                comments: {
                    create: {
                        content: 'Definitely buy!',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post18 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'I use this so often',
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: canOpener.id } },
                comments: {
                    create: {
                        content: 'Definitely buy!',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post19 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'I use this so often',
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: sautéPan.id } },
                comments: {
                    create: {
                        content: 'Definitely buy! Veggies and broth come out so good! ',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post20 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'My kitchen looks so much more organized!',
                rating: 5,
                user: { connect: { id: henrietta.id } },
                equipment: { connect: { id: airtightContainer.id } },
                comments: {
                    create: {
                        content: 'If you love to be organized...Definitely buy!',
                        user: { connect: { id: henrietta.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })



        // <------ KAT COMMENTS ------>

        const post21 = await prisma.post.create({
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

        const post22 = await prisma.post.create({
            data: {
                title: "Love this!",
                content: 'I use this so often',
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: Mandolin.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: kat.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post23 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `Quite Efficient!`,
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: cuttingBoard.id } },
                comments: {
                    create: {
                        content: 'definitely buy!',
                        user: { connect: { id: kat.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post24 = await prisma.post.create({
            data: {
                title: "Works great!",
                content: `Quite Efficient!`,
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: dishTowel.id } },
                comments: {
                    create: {
                        content: 'Keeps my counter from getting water and food stains',
                        user: { connect: { id: kat.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post25 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I love this!!`,
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: stockPot.id } },
                comments: {
                    create: {
                        content: 'I feel like Betty Crocker herself when using a Stock Pot! Food comes out ahhmazingg! ',
                        user: { connect: { id: kat.id } },
                    }
                }
            },
            include: { user: true, equipment: true }
        })

        const post26 = await prisma.post.create({
            data: {
                title: "Works even better!",
                content: `I love this!!`,
                rating: 5,
                user: { connect: { id: kat.id } },
                equipment: { connect: { id: aluminumFoil.id } },
                comments: {
                    create: {
                        content: 'Wrap all types of my food with this. Can do no wrong with having in the kitchen!',
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