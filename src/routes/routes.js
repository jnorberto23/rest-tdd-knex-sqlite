import express from "express";
import HomeControllers from "../controllers/HomeControllers.js";
import UserControllers from "../controllers/UserControllers.js";

const router = express.Router();

// Home routes
router.get("/", HomeControllers.index);

// User routes
router.post("/user", UserControllers.create);


export default router;