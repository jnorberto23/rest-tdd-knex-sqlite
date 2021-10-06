import express from "express";
import HomeControllers from "../controllers/HomeControllers.js";
import UserControllers from "../controllers/UserControllers.js";

const router = express.Router();

// Home routes
router.get("/", HomeControllers.index);

// User routes

router.post("/user", UserControllers.create);

router.get("/user/:id", UserControllers.findById);

router.delete("/user/:id", UserControllers.deleteById);

export default router;