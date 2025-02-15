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
        return await getRowsFromTable("appointments");
    }
}

class Services {
    static async getServices() {
        return await getRowsFromTable("services");
    }
}

module.exports = { Appointments, Services };
