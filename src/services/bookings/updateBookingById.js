import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  const { userId, propertyId, ...rest } = updatedBooking;

  
  const booking = await prisma.booking.update({
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

  return booking;
};

export default updateBookingById;