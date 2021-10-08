import express from "express";
import HomeControllers from "../controllers/HomeControllers.js";
import UserControllers from "../controllers/UserControllers.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Home routes

router.get("/", HomeControllers.index);

// User routes

router.post("/user", UserControllers.create);
router.post("/auth", UserControllers.auth);
router.get("/user/:id", UserControllers.findById);
router.put("/user/", auth, UserControllers.edit)
router.delete("/user/:id", auth, UserControllers.deleteById);

export default router;