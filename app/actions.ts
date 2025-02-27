"use server";

import { Appointment, cancelAppointmentByID, setNewAppointment, User } from "@/utils/database";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
    service_id: z.string().refine(
        (value) => !Number.isNaN(Number.parseInt(value, 10)),
        { 
            message: "Era esperado o número de ID do serviço" 
        }
    ),
    appointment_date: z.string().refine(
        (value) => {
            const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
            if (!regex.test(value)) return false;

            const selectedDate = new Date(value);
            const today = new Date();
            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 30);

            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);
            maxDate.setHours(0, 0, 0, 0);

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

export async function validateAppointmentForm(prevState: any, {formData, user}: {formData: FormData, user: User}): Promise<any> {
    const validatedFields = schema.safeParse({
        service_id: formData.get("service"),
        appointment_date: formData.get("date"),
        client_phone: formData.get("tel"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const appointmentFields: Appointment = {
        appointment_date: validatedFields.data.appointment_date,
        client_email: user.email,
        client_name: user.name,
        client_phone: validatedFields.data.client_phone,
        service_id: validatedFields.data.service_id,
        status: "agendado"
    }

    setNewAppointment(appointmentFields);

    redirect("/agendar/ok");
}

export async function cancelAppointment(_: any, id: string) {
    cancelAppointmentByID(id);
}
