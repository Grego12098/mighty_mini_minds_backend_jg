import { Router } from "express";

// import functions
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserEntries
} from "../controllers/controllers.users.js";
// import validation token middleware
import{validateToken, authorizeUser} from "../controllers/JWT.js";

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

router.post("/users/validation", validateToken, (req, res) => {
  res.send({validation: true, message: "User is authenticated"});
})

router.get("/users/entries",  authorizeUser, getUserEntries
);




export default router;
