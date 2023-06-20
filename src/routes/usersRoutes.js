import { Router } from "express";

// import functions
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/controllers.users.js";

const router = Router();

// sets up routes for users
router.get("/users/", getUsers);
router.get("/users/:id", getUser);
router.post("/users/", createUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);

export default router;
