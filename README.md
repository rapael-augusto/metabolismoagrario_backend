NODE 20.11.1

<!-- helper to generate resources (dev): npx @nestjs/cli g resource -->

- cd into the BACKEND folder
- create and fill a `.env` file like the `.env.example`
- run `docker compose up -d` (to start DB)
- run `npm install`
- run `npx prisma migrate dev` to apply migrations
- run `npm run dev` to start the server

When (if) prisma types bug when developing: just delete `node_modules/.prisma` folder and run `npm install` then `npx prisma generate`
