import { Router } from "express";
import { getHomePageTitles, searchTitle, getTitle, getTitlesByGenre } from "../controllers/index.js";


const router = Router();

router.get("/releases", getHomePageTitles);
router.get("/:titleId", getTitle);
router.get("/genres/:genreId", getTitlesByGenre);
router.post("/search", searchTitle);

export { router as indexRouter };

