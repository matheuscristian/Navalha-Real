"use client";

import { validateAppointmentForm } from "@/app/actions";
import { useActionState } from "react";
import Button from "./Button";

export default function AppointmentForm() {
    const [state, formAction, pending] = useActionState(validateAppointmentForm, { errors: [] });

    return (
        <form action={formAction} className="flex items-center justify-around flex-col gap-6 p-6 w-full md:w-1/2">
            <div>
                <div className="max-w-64">
                    <label htmlFor="service" className="block mb-1 text-gray-500">
                        Selecione o serviço
                    </label>
                    <select className="p-2 min-w-64 rounded-md block" name="service" id="service" required>
                        <option value="Corte">Corte</option>
                    </select>
                    {state.errors?.service && <span className="text-sm text-red-300">{state.errors.service[0]}</span>}
                </div>
                <div className="mt-6 max-w-64">
                    <label htmlFor="date" className="block mb-1 text-gray-500">
                        Selecione a data e hora
                    </label>
                    <input
                        className="p-2 min-w-64 rounded-md block"
                        type="datetime-local"
                        name="date"
                        id="date"
                        required
                    />
                    {state.errors?.date && (
                        <span className="text-sm text-red-300 max-w-64">{state.errors.date[0]}</span>
                    )}
                </div>
                <div className="mt-6 max-w-64">
                    <label htmlFor="tel" className="block mb-1 text-gray-500">
                        Escreva o número de telefone
                    </label>
                    <input
                        className="p-2 min-w-64 rounded-md block"
                        type="tel"
                        placeholder="(00) 9 9999-9999"
                        name="tel"
                        id="tel"
                        required
                    />
                    {state.errors?.tel && <span className="text-sm text-red-300 max-w-64">{state.errors.tel[0]}</span>}
                </div>
            </div>
            <Button color="blue" text="Enviar" type="submit" />
        </form>
    );
}
