import { Router } from "express";
import { createUser, getAllUsers, updateLocation, userLogin } from "../Controllers/Users.js";


const router = Router();

router.post("/signup",createUser)
router.post("/login", userLogin)
router.put("/patch", updateLocation)
router.get("/getAll", getAllUsers)


export default router;