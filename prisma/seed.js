import { PrismaClient } from "@prisma/client";
import reviewData from "../src/data/reviews.json" with { type: "json" };


const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { reviews } = reviewData;
  
  

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id:review.id,
        rating: review.rating,
        comment: review.comment,
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