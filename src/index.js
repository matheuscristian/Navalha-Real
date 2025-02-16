const express = require("express");
const path = require("path");

const db = require("./database.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "static/")));

// Define o sistema de renderização dinâmica
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/"));

app.get('/', (req, res) => {
	res.redirect("/sobre");
});

app.get("/sobre", (req, res) => {
	res.render("sobre");
});

app.get("/agendar", async (req, res) => {
	res.render("agendamento", { services: await db.Services.getServices(), appointments: await db.Appointments.getAppointments() });
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
