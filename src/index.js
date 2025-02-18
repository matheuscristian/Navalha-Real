const express = require("express");
const path = require("path");
const util = require("util");
const bodyParser = require("body-parser");

const db = require("./database.js");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
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

// Recebe as informações dos agendamentos
app.post("/agendar", (req, res) => {
	console.log(util.styleText("yellow", "INFO: ") + "Recebendo informações POST de '/agendar'...");
	console.log(req.body);
	
	res.redirect("/agendar");
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
