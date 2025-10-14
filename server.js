import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from App01
//app.use('/App01', express.static(path.join(__dirname, 'App01')));
app.use("/ProjectTSApp", express.static(path.join(__dirname, "ProjectTSApp")));

// Mock user data
let users = [
  { id: 1, name: "Mock User 1" },
  { id: 2, name: "Mock User 2" },
];

// GET all users
app.get("/api/users", (req, res) => {
  res.json({ users });
});

// GET user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

// POST new user
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = req.body.name || user.name;
  res.json(user);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });
  const deleted = users.splice(index, 1)[0];
  res.json(deleted);
});

// Simulate delay
app.get("/api/delay", (req, res) => {
  setTimeout(() => {
    res.json({ status: "Delayed response" });
  }, 2000);
});

// Simulate error
app.get("/api/error", (req, res) => {
  res.status(500).json({ error: "Internal server error" });
});

// Search by query
app.get("/api/search", (req, res) => {
  const { name } = req.query;
  const result = users.filter((u) =>
    u.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json({ users: result });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
