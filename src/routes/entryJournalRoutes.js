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
router.get("/entry/", getEntries);
router.get("/entry/:id", getEntry);

router.post("/entry/", authorizeUser,(req, res) => {
  createEntry(req, res, req.user_uuid)
});

router.delete("/entry/:id", deleteEntry);
router.patch("/entry/:id", updateEntry);

export default router;