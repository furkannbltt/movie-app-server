import express from "express";
import { addComment, getComments } from "../controllers/comment";

const router = express.Router();

router.post("/new", addComment);
router.post("/",getComments );


export default router;
