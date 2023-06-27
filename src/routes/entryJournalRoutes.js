import { Router } from "express";
import { authorizeUser } from "../controllers/JWT.js";

// import functions
import {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry,
} from "../controllers/controllers.entries.js";

const router = Router();

// sets up routes for entry

router.get("/entries", getEntries);

router.post("/entries/:user_uuid",createEntry);

router.delete("/entries/:id", deleteEntry);
router.patch("/entries/:id", updateEntry);

export default router;