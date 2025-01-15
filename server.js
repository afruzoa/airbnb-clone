import express from "express";
import path from "path";
import db from "./server/table.js";
import categoriesRoute from "./routes/categories.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, "localhost", () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
// Routes
app.use("/api/categories", categoriesRoute);
app.use("/api/rooms", roomsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
