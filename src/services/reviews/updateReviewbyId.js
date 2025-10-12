import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  const { userId, propertyId, ...rest } = updatedReview;

  
  const review = await prisma.review.update({
    where: { id },
    data: {
      ...rest,
      gebruikerId: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
      eigendomId: propertyId
        ? {
            connect: {id: propertyId},
          }
        : undefined,
    },
  });

  return review;
};

export default updateReviewById;