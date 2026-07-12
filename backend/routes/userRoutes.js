import express from "express";

//controllers
import { createUser, loginUser } from "../controllers/userController.js";

//middleware

const router = express.Router()

router.route('/').post(createUser);
router.post('/auth', loginUser);

export default router;
