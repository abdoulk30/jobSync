const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const { toggleFavorite } = require("../controllers/jobController");

router.post("/", authMiddleware, jobController.createJob);
router.get("/", authMiddleware, jobController.getJobs);
router.put("/:id", authMiddleware, jobController.updateJob);
router.delete("/:id", authMiddleware, jobController.deleteJob);
router.get("/:id", authMiddleware, jobController.getJobById);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;