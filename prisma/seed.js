import { PrismaClient } from "@prisma/client";
import reviewData from "../src/data/reviews.json" with { type: "json" };
import userData from "../src/data/users.json" with {type: "json"};


const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { reviews } = reviewData;
  const {users}= userData;
  
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        pictureUrl: user.pictureUrl,
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id:review.id,
        rating: review.rating,
        comment: review.comment,
        userId:{
          connect: {id: review.userId},
        },
      },
    });
  }

  



  

  


}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });