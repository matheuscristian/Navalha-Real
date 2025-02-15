const sql = require("sqlite3");
const path = require("path");
const util = require("util");

const db = new sql.Database(path.join(__dirname, "../database.db"), (err) => {
    if (err) {
        console.error(err);
        process.kill(-1);
    }

    console.log(util.styleText("yellow", "INFO: ") + "Banco de dados carregado!");
});

class Appointments {
    static async getAppointments() {
        const appointments_rows = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM appointments", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        return appointments_rows;
    }
}

class Services {
    static async getServices() {
        const service_rows = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM services", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        return service_rows;
    }
}

module.exports = { Appointments, Services };
