import express from "express";
import { login, userRegistration } from "../controller/auth.controller.js";

const router = express.Router();

// http://localhost:3000/api/v1/auth/userregistration
router.post("/userregistration", userRegistration);
// http://localhost:3000/api/v1/auth/login
router.post("/login", login);

export default router;
