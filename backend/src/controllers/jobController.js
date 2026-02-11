const prisma = require("../config/prisma");

const TEST_USER_ID = "3fcc5367-c909-44ee-a3e2-1941f4e4c27c";

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await prisma.job.create({
      data: {
        ...req.body,
        dateApplied: new Date(req.body.dateApplied),
        userId: "3fcc5367-c909-44ee-a3e2-1941f4e4c27c",
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
      where: { userId: TEST_USER_ID },
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
      where: { id }, // ❗ removed Number()
      data: req.body,
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
      where: { id }, // ❗ removed Number()
    });

    res.json({ message: "Job deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};
