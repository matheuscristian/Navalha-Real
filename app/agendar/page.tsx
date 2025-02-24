import AppointmentForm from "@/components/AppointmentForm";
import { getServices } from "@/utils/database";

export default async function Page() {
    const services = await getServices();
    
    return (
        <div className="flex flex-col justify-center items-center flex-1 self-center justify-self-center">
            <div className="bg-gray-200 container lg:w-[1024] shadow-xl rounded-md">
                <div className="p-4 flex justify-center bg-gray-300 rounded-md">
                    <h1 className="uppercase text-lg font-bold">agendamento</h1>
                </div>
                <div className="flex justify-between w-full min-h-[550px]">
                    <div className="md:flex flex-col hidden w-1/2 p-6 text-justify gap-2">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis consequatur nobis, autem
                            vitae quos molestias animi accusamus perferendis possimus dignissimos, reprehenderit ipsa
                            nostrum cumque, nulla voluptate explicabo numquam fuga iure.
                        </p>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis consequatur nobis, autem
                            vitae quos molestias animi accusamus perferendis possimus dignissimos, reprehenderit ipsa
                            nostrum cumque, nulla voluptate explicabo numquam fuga iure. Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Veritatis consequatur nobis, autem vitae quos molestias animi
                            accusamus perferendis possimus dignissimos, reprehenderit ipsa nostrum cumque, nulla
                            voluptate explicabo numquam fuga iure.
                        </p>
                    </div>
                    <div className="w-[1px] bg-black/20 md:block hidden"></div>
                    <AppointmentForm services={services} />
                </div>
            </div>
        </div>
    );
}
