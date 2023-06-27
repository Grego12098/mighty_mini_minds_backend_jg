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

router.post("/entry/",(req, res) => {
  createEntry(req, res,)
});

router.delete("/entry/:id", deleteEntry);
router.patch("/entry/:id", updateEntry);

export default router;