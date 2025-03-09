"use server";

import { Appointment, cancelAppointmentByID, getAllAppointmentsByDay, setNewAppointment, User } from "@/utils/database";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
    service_id: z.string().refine((value) => !Number.isNaN(Number.parseInt(value, 10)), {
        message: "Era esperado o número de ID do serviço",
    }),
    appointment_date: z.string().refine(
        (value) => {
            const selectedDate = new Date(new Date(value).getTime() - new Date(value).getTimezoneOffset() * 60000);
            const today = new Date(new Date().getTime() - new Date(value).getTimezoneOffset() * 60000);
            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 30);

            maxDate.setHours(0, 0, 0, 0);

            console.log(selectedDate);
            console.log(maxDate);
            console.log(today);

            return selectedDate >= today && selectedDate <= maxDate;
        },
        {
            message: "A data deve estar entre hoje e 30 dias no futuro.",
        }
    ),
    client_phone: z.string().refine(
        (value) => {
            const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
            return regex.test(value);
        },
        {
            message: "Telefone inválido.",
        }
    ),
});

export async function validateAppointmentForm(
    prevState: any,
    { formData, user }: { formData: FormData; user: User }
): Promise<any> {
    const dateStr = formData.get("date")?.toString();
    const timeStr = formData.get("time")?.toString();

    if (!dateStr || !timeStr) {
        throw new Error("Invalid date or time");
    }

    const [hours, minutes] = timeStr.split(":");
    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    const dateTimeString = `${dateStr}T${formattedHours}:${formattedMinutes}:00`;

    const validatedFields = schema.safeParse({
        service_id: formData.get("service"),
        appointment_date: dateTimeString,
        client_phone: formData.get("tel"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const appointmentFields: Appointment = {
        appointment_date: dateTimeString,
        client_email: user.email,
        client_name: user.name,
        client_phone: validatedFields.data.client_phone,
        service_id: validatedFields.data.service_id,
        status: "agendado",
    };

    setNewAppointment(appointmentFields);

    redirect("/agendar/ok");
}

export async function cancelAppointment(_: any, id: string) {
    cancelAppointmentByID(id);
}

export async function retrieveValidAppointmentHours(_: any, date: Date): Promise<any> {
    const appointmentsThisDay = await getAllAppointmentsByDay(date);
    const hours = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
    ].filter((hour) => {
        const now = new Date();
        const tempDate = new Date(date);
        tempDate.setDate(date.getDate() + 1);

        const hourSplit = hour.split(":");
        tempDate.setHours(Number(hourSplit[0]), Number(hourSplit[1]));

        return tempDate > now;
    });

    const bookedTimes = appointmentsThisDay.map((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date);
        return `${appointmentDate.getHours().toString().padStart(2, "0")}:${
            appointmentDate.getMinutes() === 0 ? "00" : "30"
        }`;
    });

    const availableHours = hours.filter((time) => !bookedTimes.includes(time));

    return availableHours;
}
