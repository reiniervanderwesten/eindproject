import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();

    const filter = {};
    const prijsAlsGetal = Number(pricePerNight);

  if (location) {
    filter.location = { contains: location };
  }

  if (pricePerNight) {
    filter.pricePerNight = { equals: prijsAlsGetal };
  }

  const properties = await prisma.property.findMany({ where: filter });


    

    return properties;
      

  



  

  
};

export default getProperties;















