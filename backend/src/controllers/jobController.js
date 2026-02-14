const prisma = require("../config/prisma");



// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await prisma.job.create({
      data: {
        ...req.body,
        dateApplied: new Date(req.body.dateApplied),
        userId: req.userId,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create job" });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.job.update({
      where: { id }, // UUID — no Number()
      data: {
        ...req.body,
        ...(req.body.dateApplied && {
          dateApplied: new Date(req.body.dateApplied),
        }),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update job" });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.job.delete({
      where: { id }, // UUID — no Number()
    });

    res.json({ message: "Job deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};
