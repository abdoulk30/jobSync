const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, jobController.createJob);
router.get("/", authMiddleware, jobController.getJobs);
router.put("/:id", authMiddleware, jobController.updateJob);
router.delete("/:id", authMiddleware, jobController.deleteJob);
router.get("/:id", authMiddleware, jobController.getJobById);

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);
router.get("/:id", jobController.getJobById);

module.exports = router;
