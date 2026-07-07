import express from "express";
//controllers
//middleware

const router = express.Router()

router.route('/').post(createUser);

export default router;
