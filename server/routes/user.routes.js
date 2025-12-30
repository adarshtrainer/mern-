import express from "express";
import { editUser } from "../controller/user.controller.js";
import { deleteUser } from "../controller/user.controller.js";
import { getSingleuserById } from "../controller/user.controller.js";
import { getAllusers } from "../controller/user.controller.js";
import { authorize, restrict } from "../auth/verification.js";

const router = express.Router();

// http://localhost:3000/api/v1/user/edituser/12345
router.put("/edituser/:id", authorize, restrict(["admin"]), editUser);
// deleteuser
router.put("/deleteuser/:id", authorize, restrict(["admin"]), deleteUser);
// getsingleuserinfo
router.put("/getsingleuser/:id", authorize, restrict(["admin"]), getSingleuserById);
// getalluser
router.get("/getallusers", authorize, restrict(["admin"]), getAllusers);
export default router;
