import { Router } from "express";
import { getHomePageTitles } from "../controllers/index.js";


const router = Router();

router.get("/releases", getHomePageTitles);

export { router as titleRouter };

