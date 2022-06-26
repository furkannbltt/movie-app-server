import express from "express";
import { getFilms,filmDetail, searchFilms } from "../controllers/films";

const router = express.Router();

router.post("/", getFilms);
router.post("/detail", filmDetail);
router.post("/search", searchFilms);


export default router;
