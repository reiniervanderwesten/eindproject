import { PrismaClient } from "@prisma/client";

const getHosts = async (name, username) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
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

  return hosts;
};

export default getHosts;