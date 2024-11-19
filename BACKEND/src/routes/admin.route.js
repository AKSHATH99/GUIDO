import { Router } from "express";
import { toggleApprovedStatus , fetchFromDB } from "../controllers/admin.controller.js";
import cors from "cors";

const router = Router();

router.route("/fetchDB").get(fetchFromDB);
router.route("/toggleStatus/:id").post(toggleApprovedStatus);

export default router;