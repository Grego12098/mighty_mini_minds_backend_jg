import { Router } from "express";

import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  
} from "../controllers/controllers.users.js";
import { sendBadWeekEmail } from "../controllers/controllers.email.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the users API");
})

router.post("/sendbademail/:user_uuid", sendBadWeekEmail)


router.get("/users", getUsers);

router.get("/users/:user_uuid", getUser);

router.patch("/users/:uuid", updateUser);

router.delete("/users/:uuid", deleteUser);

export default router;
