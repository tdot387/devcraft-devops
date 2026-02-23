const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.note.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
