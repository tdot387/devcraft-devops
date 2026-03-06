const express = require("express");
const cors = require("cors");
const notesRouter = require("./routes/notes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", version: "1.0.1", team: "devcraft" });
});

app.use("/notes", notesRouter);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
