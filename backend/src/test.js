const prisma = require("./config/prisma");

async function test() {
  const jobs = await prisma.job.findMany();
  console.log(jobs);
  process.exit();
}

test();
