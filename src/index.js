const express = require("express");
const path = require("path");

const db = require("./database.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "static/")));

// Define o sistema de renderização dinâmica
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/"));

app.get('/', async (req, res) => {
	res.render("home", { services: await db.Services.getServices() });
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
