import { Router } from "express";

// import functions
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
} from "../controllers/controllers.users.js";
// import validation token middleware
import{validateToken} from "../controllers/JWT.js";

const router = Router();

// sets up routes for users
router.get("/", (req, res) => {
  res.send("Welcome to the users API");
})
router.get("/users/", getUsers);
router.get("/users/:id", getUser);
router.post("/users/", createUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
router.post("/users/login", authenticateUser);


export default router;
