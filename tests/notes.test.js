const request = require("supertest");
const app = require("../server");

describe("Health Check", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("Notes API", () => {
  describe("POST /notes", () => {
    it("creates a note with title and content", async () => {
      const res = await request(app)
        .post("/notes")
        .send({ title: "Test Note", content: "Some content" });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe("Test Note");
      expect(res.body.content).toBe("Some content");
      expect(res.body.id).toBeDefined();
    });

    it("returns 400 if title is missing", async () => {
      const res = await request(app)
        .post("/notes")
        .send({ content: "No title" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Title is required");
    });
  });

  describe("GET /notes", () => {
    it("returns empty array when no notes exist", async () => {
      const res = await request(app).get("/notes");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("returns all notes", async () => {
      await request(app).post("/notes").send({ title: "Note 1" });
      await request(app).post("/notes").send({ title: "Note 2" });

      const res = await request(app).get("/notes");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe("GET /notes/:id", () => {
    it("returns a single note", async () => {
      const created = await request(app)
        .post("/notes")
        .send({ title: "Find Me" });

      const res = await request(app).get(`/notes/${created.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Find Me");
    });

    it("returns 404 for non-existent note", async () => {
      const res = await request(app).get("/notes/non-existent-id");
      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /notes/:id", () => {
    it("updates a note", async () => {
      const created = await request(app)
        .post("/notes")
        .send({ title: "Original" });

      const res = await request(app)
        .patch(`/notes/${created.body.id}`)
        .send({ title: "Updated" });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Updated");
    });

    it("returns 404 for non-existent note", async () => {
      const res = await request(app)
        .patch("/notes/non-existent-id")
        .send({ title: "Nope" });

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /notes/:id", () => {
    it("deletes a note", async () => {
      const created = await request(app)
        .post("/notes")
        .send({ title: "Delete Me" });

      const res = await request(app).delete(`/notes/${created.body.id}`);
      expect(res.status).toBe(204);

      const check = await request(app).get(`/notes/${created.body.id}`);
      expect(check.status).toBe(404);
    });

    it("returns 404 for non-existent note", async () => {
      const res = await request(app).delete("/notes/non-existent-id");
      expect(res.status).toBe(404);
    });
  });
});
