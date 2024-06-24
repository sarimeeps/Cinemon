import { Router } from "express";
import { getReleases } from "../controllers/titles.js";


const router = Router();

router.get("/releases", getReleases);

export { router as titleRouter };

