import { PrismaClient } from "@prisma/client";

const createReview = async (
  rating,
  comment,
  userId,
  propertyId 
    
  
) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.create({
    data: {
      rating,
      comment,     
                  
      userId: {
        connect: { id: userId },
      },
      propertyId: {
        connect: {id: propertyId},
      },
    },
  });

  return review;
};

export default createReview;