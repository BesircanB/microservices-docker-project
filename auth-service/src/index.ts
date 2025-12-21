import express from "express";

const app = express();
app.use(express.json());

const PORT = 3001;

// Fake in-memory user store
const users: { id: number; email: string; password: string }[] = [];

// Register endpoint
app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password
  };

  users.push(newUser);

  res.json({
    message: "User registered successfully",
    userId: newUser.id
  });
});

// Login endpoint
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Fake token
  const token = `user-${user.id}-token`;

  res.json({ token });
});


app.get("/", (_req, res) => {
  res.send("Auth Service is running");
});

app.listen(PORT, () => {
  const host = "localhost";
  console.log(`Auth service running at http://${host}:${PORT}`);
});

