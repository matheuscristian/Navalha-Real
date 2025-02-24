"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const navDestinations = ["/sobre", "/agendar"];

    return (
        <header className="w-full flex justify-between items-center p-8 bg-neutral-600 shadow">
            <Link href="/">
                <p className="text-xl text-white">Meu WebSite</p>
            </Link>
            <ul className="flex gap-4 text-white">
                {navDestinations.map((dest, index) => (
                    <li key={index}>
                        <Link href={dest} className={`hover:underline ${usePathname() == dest && "text-blue-200"}`}>
                            {dest.slice(1)}
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    );
}
