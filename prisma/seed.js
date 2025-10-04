import { PrismaClient } from "@prisma/client";
import reviewData from "../src/data/reviews.json" with { type: "json" };
import userData from "../src/data/users.json" with {type: "json"};
import propertyData from "../src/data/properties.json" with {type: "json"};
import bookingData from "../src/data/bookings.json" with {type: "json"};


const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { reviews } = reviewData;
  const {users}= userData;
  const {properties}= propertyData;
  const {bookings}=bookingData;
  
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

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        hostId: property.hostId,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedRoomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
      },
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,    
        userId: {
          connect: {id: booking.userId},
        },
        propertyId:{
          connect: {id:booking.propertyId},
        },
        
        
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
        propertyId:{
          connect: {id: review.propertyId},
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