import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewbyId.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import auth from "../middleware/auth.js";
import { Prisma } from "@prisma/client";


const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      rating,
      comment,
      userId,
      propertyId,     
            
      
    } = req.body;
    const newReview = await createReview(
      rating,      
      comment,
      userId,
      propertyId,      
            
    );
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json("Bad request");
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      rating,
      comment,
      userId,
      propertyId,      
            
      
    } = req.body;
    const review = await updateReviewById(id, {
      rating,
      comment,
      userId,
      propertyId,     
           
      
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError){
      if (error.code==='P2025'){
        res.status(404).json({
        message: `Review not found`,
      });
      }
    }
    else{next(error)}

  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});


export default router;