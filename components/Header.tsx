"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function Header() {
    const navDestinations = ["/sobre", "/agendar"];

    const [loginPath, setLoginPath] = useState("/login");

    useEffect(() => {
        setLoginPath(Cookie.get("token") ? "/logout" : "/login");
    }, [usePathname()]);

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
                <li>
                    <Link href={loginPath} className={`hover:underline ${usePathname() == loginPath && "text-blue-200"}`}>
                        {loginPath.slice(1)}
                    </Link>
                </li>
            </ul>
        </header>
    );
}
