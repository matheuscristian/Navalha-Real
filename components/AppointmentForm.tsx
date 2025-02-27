"use client";

import { validateAppointmentForm } from "@/app/actions";
import {  useActionState } from "react";
import Button from "./Button";
import { Service, User } from "@/utils/database";

export default function AppointmentForm({ services, user }: { services: Service[], user: User }) {
    const [state, formAction, pending] = useActionState(validateAppointmentForm, { errors: [] });

    const onSubmit = (e: FormData) => {
        formAction({ formData: e, user });
    }

    return (
        <form action={(e) => onSubmit(e)} className="flex items-center justify-around flex-col gap-6 p-6 w-full md:w-1/2">
            <div>
                <div className="max-w-64">
                    <label htmlFor="service" className="block mb-1 text-gray-500">
                        Selecione o serviço
                    </label>
                    <select className="p-2 w-64 rounded-md block" name="service" id="service" required>
                        {services.map((service) => (
                            <option value={service.id} key={service.id}>{service.service_name} - R${service.price} - {service.duration} Minutos</option>
                        ))}
                    </select>
                    {state.errors?.service_id && <span className="text-sm text-red-300">{state.errors.service_id[0]}</span>}
                </div>
                <div className="mt-6 max-w-64">
                    <label htmlFor="date" className="block mb-1 text-gray-500">
                        Selecione a data e hora
                    </label>
                    <input
                        className="p-2 w-64 rounded-md block"
                        type="datetime-local"
                        name="date"
                        id="date"
                        required
                    />
                    {state.errors?.appointment_date && (
                        <span className="text-sm text-red-300 max-w-64">{state.errors.appointment_date[0]}</span>
                    )}
                </div>
                <div className="mt-6 max-w-64">
                    <label htmlFor="tel" className="block mb-1 text-gray-500">
                        Escreva o número de telefone
                    </label>
                    <input
                        className="p-2 w-64 rounded-md block"
                        type="tel"
                        placeholder="(00) 9 9999-9999"
                        name="tel"
                        id="tel"
                        required
                    />
                    {state.errors?.client_phone && <span className="text-sm text-red-300 max-w-64">{state.errors.client_phone[0]}</span>}
                </div>
            </div>
            <Button color="blue" text="Enviar" type="submit" />
        </form>
    );
}
