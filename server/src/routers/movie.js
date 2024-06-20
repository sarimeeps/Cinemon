import { Router } from "express";
import { getReleases } from "../controllers/movie.js";


const router = Router();

router.get("/releases", getReleases);

export { router as movieRouter };

