import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

export default router;