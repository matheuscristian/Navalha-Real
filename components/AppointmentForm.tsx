"use client";

import { retrieveValidAppointmentHours, validateAppointmentForm } from "@/app/actions";
import { ChangeEvent, startTransition, useActionState, useEffect, useState } from "react";
import Button from "./Button";
import { Service, User } from "@/utils/database";

export default function AppointmentForm({ services, user }: { services: Service[]; user: User }) {
    const [validationState, formAction] = useActionState(validateAppointmentForm, { errors: [] });
    const [validHoursState, retrieveHoursAction] = useActionState(retrieveValidAppointmentHours, []);

    const onSubmit = (e: FormData) => {
        formAction({ formData: e, user });
    };

    const [validHours, setValidHours] = useState<string[]>([]);

    const handleDateChange = (dateInput: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setValidHours([]);
            retrieveHoursAction(new Date(dateInput.target.value));
        });
    };

    useEffect(() => {
        setValidHours(validHoursState);
    }, [validHoursState]);

    return (
        <form
            action={(e) => onSubmit(e)}
            className="flex items-center justify-around flex-col gap-6 p-6 w-full md:w-1/2"
        >
            <div>
                <div className="max-w-64">
                    <label htmlFor="service" className="block mb-1 text-gray-500">
                        Selecione o serviço
                    </label>
                    <select className="p-2 w-64 rounded-md block" name="service" id="service" required>
                        {services.map((service) => (
                            <option value={service.id} key={service.id}>
                                {service.service_name} - R${service.price} - {service.duration} Minutos
                            </option>
                        ))}
                    </select>
                    {validationState.errors?.service_id && (
                        <span className="text-sm text-red-300">{validationState.errors.service_id[0]}</span>
                    )}
                </div>
                <div className="mt-6 max-w-64">
                    <label htmlFor="date" className="block mb-1 text-gray-500">
                        Selecione a data
                    </label>
                    <input
                        className="p-2 w-64 rounded-md block"
                        type="date"
                        name="date"
                        id="date"
                        onInput={handleDateChange}
                        required
                    />
                    {validationState.errors?.appointment_date && (
                        <span className="text-sm text-red-300 max-w-64">
                            {validationState.errors.appointment_date[0]}
                        </span>
                    )}
                </div>
                <div className="mt-6 max-w-64">
                    <label htmlFor="time" className="block mb-1 text-gray-500">
                        Selecione a hora
                    </label>
                    <select className="p-2 w-64 rounded-md block" name="time" id="time" required>
                        {validHours.map((hour) => (
                            <option value={hour} key={hour}>
                                {hour} horas
                            </option>
                        ))}
                    </select>
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
                    {validationState.errors?.client_phone && (
                        <span className="text-sm text-red-300 max-w-64">{validationState.errors.client_phone[0]}</span>
                    )}
                </div>
            </div>
            <Button color="blue" text="Enviar" type="submit" />
        </form>
    );
}
