import express from "express";
import {
  createUser, getFavorites, loginUser,userFavorite,sendEmail
} from "../controllers/user";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.post("/favorite", userFavorite);
router.post("/favorites", getFavorites);
router.post("/send-email",sendEmail)




export default router;
