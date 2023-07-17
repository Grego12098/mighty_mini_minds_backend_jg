import { Router } from "express";

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserEntries
} from "../controllers/controllers.users.js";
import{validateToken, authorizeUser} from "../controllers/JWT.js";
import { sendBadWeekEmail } from "../controllers/controllers.email.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the users API");
})

router.post("/sendbademail/:user_uuid", sendBadWeekEmail)

router.get("/entries/:user_uuid", getUserEntries);

router.get("/users", getUsers);

router.get("/users/:user_uuid", getUser);

router.post("/users/", createUser);

router.patch("/users/:uuid", updateUser);


router.post("/users/login", authenticateUser);

router.post("/users/validation", validateToken, (req, res) => {
  res.send({validation: true, message: "User is authenticated"});
})


export default router;
