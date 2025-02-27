import AppointmentForm from "@/components/AppointmentForm";
import AppointmentList from "@/components/AppointmentList"
import { getServices, getUserAppointments, User } from "@/utils/database";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function Page() {
    const services = await getServices();
    
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const userData = jwt.verify(token, 'dntsf54nhh5zLIIQxJmBGReG3pLelaEIBqocjvvoyrw=') as User;
    
    const appointments = await getUserAppointments(userData.email);

    return (
        <div className="flex flex-col justify-center items-center flex-1 self-center justify-self-center">
            <div className="bg-gray-200 container lg:w-[1024] shadow-xl rounded-md">
                <div className="p-4 flex justify-center bg-gray-300 rounded-md">
                    <h1 className="uppercase text-lg font-bold">agendamento</h1>
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full h-[550px]">
                    <AppointmentList appointments={appointments} services={services} />
                    <div className="w-[1px] bg-black/20 md:block hidden"></div>
                    <AppointmentForm services={services} user={userData} />
                </div>
            </div>
        </div>
    );
}
