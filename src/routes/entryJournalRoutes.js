import { Router } from "express";
import { authorizeUser } from "../controllers/JWT.js";
import {sendEmail} from "../controllers/controllers.email.js";

import {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry,
} from "../controllers/controllers.entries.js";

const router = Router();

router.get("/entries", getEntries);

router.post("/entries/:user_uuid",createEntry);
router.post("/sendemail/:entry_id", sendEmail);

router.delete("/entries/:id", deleteEntry);
router.patch("/entries/:id", updateEntry);

export default router;