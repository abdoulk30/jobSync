const prisma = require("./config/prisma");

async function test() {
  const users = await prisma.user.findMany();
  console.log(users);
  process.exit();
}

test();
