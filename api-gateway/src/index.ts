import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = 3000;

// For now, local dev URLs.
// Later in Docker Compose, these will become: http://auth-service:3001, http://user-service:3002
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3002";

app.get("/", (_req, res) => {
  res.send("API Gateway is running");
});

// Forward registration to auth-service
app.post("/register", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (err: any) {
    // If auth-service returns error, forward it
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(500).json({ message: "Gateway error contacting auth-service" });
  }
}); 


// Forward login to auth-service
app.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (err: any) {
    // If auth-service returns error, forward it
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(500).json({ message: "Gateway error contacting auth-service" });
  }
});

// Forward users list to user-service
app.get("/users", async (_req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`);
    res.status(response.status).json(response.data);
  } catch (err: any) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(500).json({ message: "Gateway error contacting user-service" });
  }
});

// Forward user by id to user-service
app.get("/users/:id", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (err: any) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(500).json({ message: "Gateway error contacting user-service" });
  }
});




app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
  console.log(`AUTH_SERVICE_URL=${AUTH_SERVICE_URL}`);
  console.log(`USER_SERVICE_URL=${USER_SERVICE_URL}`);
});
