"use server";

import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
    service: z.string().min(1, "O serviço é obrigatório"),
    date: z.string().refine(
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
    tel: z.string().refine(
        (value) => {
            // Valida o formato do telefone (exemplo: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX)
            const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
            return regex.test(value);
        },
        {
            message: "Telefone inválido.",
        }
    ),
});

export async function validateAppointmentForm(prevState: any, formData: FormData): Promise<any> {
    const validatedFields = schema.safeParse({
        service: formData.get("service"),
        date: formData.get("date"),
        tel: formData.get("tel"),
    });

    console.log(validatedFields.data);
    console.log(validatedFields.error);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    redirect("/agendar");
}
