import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const { hostId, ...rest } = updatedProperty;

  // Here we can't use updateMany() because we need to update the createdBy and categories fields if it is passed
  const property = await prisma.property.update({
    where: { id },
    data: {
      ...rest,
      hostId: hostId
        ? {
            connect: { id: hostId },
          }
        : undefined,
      
    },
  });

  return property;
};

export default updatePropertyById;