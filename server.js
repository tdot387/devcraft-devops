const express = require("express");
const cors = require("cors");
const path = require("path");
const notesRouter = require("./routes/notes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "dies ist ein test 1337" });
  } catch (error) {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.use("/notes", notesRouter);

app.get("/overview", (req, res) => {
  res.sendFile(path.join(__dirname, "mindmap.html"));
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
