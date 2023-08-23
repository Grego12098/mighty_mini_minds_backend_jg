import { Router } from "express";
import {sendEmail} from "../controllers/controllers.email.js";

import {
  getEntries,
  getUserEntries,
  createEntry,
  deleteEntry,
  updateEntry,
} from "../controllers/controllers.entries.js";

const router = Router();

router.get("/entries", getEntries);
router.get("/entries/:user_uuid", getUserEntries);

router.post("/entries/:user_uuid",createEntry);
router.post("/sendemail/:entry_uuid", sendEmail);

router.delete("/entries/:entry_uuid", deleteEntry);
router.patch("/entries/:entry_uuid", updateEntry);

export default router;