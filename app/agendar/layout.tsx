import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function Layout({children}: {children: React.ReactNode}) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, 'dntsf54nhh5zLIIQxJmBGReG3pLelaEIBqocjvvoyrw=');
    } catch (error) {
        redirect("/login");
    }
    
    return children;
}