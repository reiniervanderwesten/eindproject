import { PrismaClient } from "@prisma/client";

const getUsers = async (name, username) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    where: {
      name: {
        contains: name,
      },
      username: {
        contains: username,
      },
    },
  });

  return users;
};

export default getUsers;