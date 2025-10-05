import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";


const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

export default router;