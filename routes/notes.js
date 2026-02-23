const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET /notes – List all notes
router.get("/", async (req, res) => {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(notes);
});

// POST /notes – Create a note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const note = await prisma.note.create({
    data: { title, content },
  });
  res.status(201).json(note);
});

// GET /notes/:id – Get a single note
router.get("/:id", async (req, res) => {
  const note = await prisma.note.findUnique({
    where: { id: req.params.id },
  });

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(note);
});

// PATCH /notes/:id – Update a note
router.patch("/:id", async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await prisma.note.update({
      where: { id: req.params.id },
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

// DELETE /notes/:id – Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await prisma.note.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

module.exports = router;
