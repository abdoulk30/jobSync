const prisma = require("./config/prisma");

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "test123",
    },
  });

  console.log(user);
}

main();
