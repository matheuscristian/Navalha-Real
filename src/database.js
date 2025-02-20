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

async function getRowsFromTable(table_name) {
    const query_rows = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${table_name}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });

    return query_rows;
}

class Appointments {
    static async getAppointments() {
        const appointments = await getRowsFromTable("appointments");

        return appointments.filter((v) => {
            const dateDiff = new Date(v.appointment_date).getTime() - new Date().getTime();

            if (dateDiff >= 0 && dateDiff < 2592000000) {
                return v;
            }
        });
    }

    static async setNewAppointment(client_name, client_email, client_phone, appointment_date, status, service_id) {
        db.all(`SELECT id, service_name FROM services WHERE service_name = '${service_id.split('-')[0].trim()}';`, (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                db.run(`INSERT INTO appointments (client_name, client_email, client_phone, appointment_date, status, service_id) VALUES ('${client_name}', '${client_email}', '${client_phone}', '${appointment_date}', '${status}', ${rows[0].id});`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
}

class Services {
    static async getServices() {
        return await getRowsFromTable("services");
    }
}

module.exports = { Appointments, Services };
