const express = require("express");
const app = express();
const path = require("path");
const PORT = 5000;

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname,'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

app.all("*", (req, res) => {
res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, "localhost", () => {
console.log(`Server is listening on http://localhost:${PORT}`);
});