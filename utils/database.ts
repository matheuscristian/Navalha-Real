import sql from "sqlite3";

const db = new sql.Database("database.db");

export interface Service {
    id?: number,
    service_name: string,
    price: number,
    duration: number
}

export interface Appointment {
    id?: string,
    client_name: string,
    client_email: string,
    client_phone: string,
    appointment_date: string,
    status: "agendado" | "cancelado" | "atendido",
    service_id: string
}

export interface User {
    id?: number,
    name: string,
    email: string,
    password: string
}

export async function getServices(): Promise<Service[]> {
    return new Promise((res, rej) => {
        db.all("SELECT * FROM services;", (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows as Service[]);
            }
        });
    });
}

export function setNewAppointment(apt_data: Appointment) {
    db.run(`INSERT INTO appointments (client_name, client_email, client_phone, appointment_date, status, service_id) VALUES ('${apt_data.client_name}', '${apt_data.client_email}', '${apt_data.client_phone}', '${apt_data.appointment_date}', 'agendado', '${apt_data.service_id}');`, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

export async function selectUserByEmail(email: string): Promise<User> {
    return new Promise((res, rej) => {
        db.all("SELECT * FROM users WHERE email = ?;", [email], (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows[0] as User);
            }
        });
    });
}

export function setNewUser(name: string, email: string, password: string) {
    db.run(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}');`, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
