import express from "express";

const app = express();
app.use(express.json());

const PORT = 3002;

// Fake in-memory users
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

// Root health/info endpoint
app.get("/", (_req, res) => {
  res.send("User Service is running");
});

// Get all users
app.get("/users", (_req, res) => {
  res.json(users);
});

// Get user by id
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`User service running at http://localhost:${PORT}`);
});
