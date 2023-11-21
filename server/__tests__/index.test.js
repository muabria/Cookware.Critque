// const app = require('../app')
// const request = require('supertest');

// const prismaMock = require('../../mocks/prismaMock');

// describe('/api/equipment', () => {
//     describe('GET /api/equipment', () => {

//         it('returns list of all equipments', async () => {
//             const equipmentListing = [
//                 { 
//                     name: "Cork Trivet", 
//                     description: "A 7-inch circle of cork that protects counter and other surfaces from hot, cold, and wet items. Ideal for hot pans and water stains.", 
//                     image: "https://m.media-amazon.com/images/I/41TDVYs3YsL._AC_US100_.jpg",
//                     category: basic,
//                     brand: "IKEA",
//                     purchaseLink: "https://www.amazon.com/dp/B00QOLXPV0?psc=1&ref=ppx_yo2ov_dt_b_product_details",
//                     priceRating: 1 },
//                 { 
//                     name: "Dobie", 
//                     description: "A cleaning sponge with a little abrasion to get food off.", 
//                     image: "https://m.media-amazon.com/images/I/71WMDYKl1PL._AC_SX679_.jpg",
//                     category: cleaning,
//                     brand: "Scotch-Brite",
//                     purchaseLink: "https://www.amazon.com/Scotch-Brite-Dobie-All-Purpose-Pad-Count/dp/B0011DR9WC/ref=sr_1_7?crid=17V6Q2H276G01&keywords=dobie&qid=1699408365&s=home-garden&sprefix=dobie%2Cgarden%2C152&sr=1-7",
//                     priceRating: 1 },
//             ];

//             prismaMock.equipmentListing.findMany.mockResolvedValue(equipmentListing);

//             const response = await request(app).get('/api/equipment');

//             expect(response.body).toEqual(equipmentListing);
//             expect(response.body).toEqual(equipmentListing);
//         });
//     })
// });