# Cookware Critique  
View our website: https://cooking-equipment.onrender.com/  

## Table of Contents 
1. [Description](https://github.com/muabria/Capstone/tree/readme?tab=readme-ov-file#description)  
2. [Contributors](https://github.com/muabria/Capstone/tree/readme?tab=readme-ov-file#contributors)  
3. [Technology Used](https://github.com/muabria/Capstone/tree/readme?tab=readme-ov-file#technology-used)  
4. [How to Setup the Project](https://github.com/muabria/Capstone/tree/readme?tab=readme-ov-file#how-to-setup-the-project)  
5. [Known Issues](https://github.com/muabria/Capstone/tree/readme?tab=readme-ov-file#known-issues)  

## Description  
While its name gives away the basis of the website, the real reason we chose to make it was to help everyday people find everyday cookware, especially those just starting out on their cooking journeys. With all of the kitchen equipment out there, it can be hard to know what works the best.   

Cookware Critique allows users to browse kitchen equipment and read/write reviews for them.

## Contributors
- [Marisa Vandellos](https://github.com/mvandell)
- [Kat Christensen](https://github.com/katc336)
- [Brianna Moore](https://github.com/muabria)
- [Henrietta Mizhquiri](https://github.com/mizhenn)

## Technology Used
![Postgres badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  ![Prisma badge](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)  ![Redux badge](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)  ![React badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  ![React Router badge](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  ![Vite badge](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)  ![NPM badge](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)  ![Node badge](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## How to Setup the Project
To run this code on your computer, follow these steps:  
1. Copy the 'clone' link from the **<> Code** button
2. Run `git clone <copied link>` in the command line to copy the repo down to your local computer
3. Run `cd Cookware_Critique` to switch to the repo's folder
4. Run `npm install` in the command line to install any dependencies you don't have installed globally
5. Run `npm install react-multi-carousel --save` and `npm install @mui/joy @emotion/react @emotion/styled` in the command line to install other dependencies used
6. Create a .env file in the top-level of your folder
7. In the .env file, insert this code:  
    `PORT=<port number>`  
    `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/<database name>"`  
    `JWT_SECRET="<some secret>"`  
8. Run  the following commands in the command line to add prisma and initialize the database:  
    `npm init -y`  
    `npm install prisma --save-dev`  
    `npx prisma migrate dev --name init`  
9. Run `npm run seed` in the command line to seed the database
10. Run `npm run dev` in the command line to start the server

## Known Issues  
- Error handling for updating records  
- Update forms do not auto-populate with current content    
- Admins are not able to delete comments  
- There are very few character limits on the forms
- Some purchase links do not go to the right place