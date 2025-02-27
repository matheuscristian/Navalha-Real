"use client";

import { cancelAppointment } from "@/app/actions";
import { Appointment, Service } from "@/utils/database";
import { redirect } from "next/navigation";
import { startTransition, useActionState } from "react";

export default function Page({ appointments, services }: { appointments: Appointment[], services: Service[] }) {
    const [_, cancelAction] = useActionState(cancelAppointment, null);

    const handleCancel = (appointmentId: string) => {
        startTransition(() => {
            cancelAction(appointmentId);
            redirect("/agendar")
        });
    };

    return (
        <div className="md:w-1/2 w-full flex-col flex p-6 text-justify gap-2 overflow-y-scroll">
            <ul>
                {appointments.map((appointment, index) =>
                    <li key={appointment.id ?? index} className="flex justify-center p-4 border-[1px] border-gray-400/35  text-lg bg-gray-100 rounded-md relative mb-2">
                        {appointment.status === "agendado" && 
                            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] backdrop-brightness-75 opacity-0 hover:opacity-100 rounded-md">
                                <div className="flex justify-center items-center h-full">
                                    <button className="bg-red-600 hover:bg-red-700 active:scale-[.98] py-1 px-6 rounded-md text-white shadow-md focus:border-0" onClick={() => { handleCancel(appointment.id ?? "") }}>Cancelar</button>
                                </div>
                            </div>
                        }
                        <div className="w-full">
                        {new Date(appointment.appointment_date).toLocaleString()} <br/> {appointment.client_phone} - {appointment.status} - {services.find((v) => v.id === appointment.service_id)?.service_name}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}