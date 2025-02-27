'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import Button, { LinkButton } from '@/components/Button';
import Link from 'next/link';

export default function Page() {
    if (Cookie.get("token")) {
        return (
            <div className="flex flex-col justify-center items-center my-28 gap-14 flex-1">
                <div className="flex items-center justify-center gap-3">
                    <h1>Já está logado!</h1>
                </div>
                <LinkButton text="Voltar à página de agendamento" color="blue" dest="/agendar" />
            </div>
        )
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            Cookie.set('token', data.token, { expires: 365 });
            setError('');

            alert('Login sucedido!');
            router.push('/agendar');
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center flex-1 self-center justify-self-center">
            <div className="bg-gray-200 container lg:w-[1024] shadow-xl rounded-md">
                <div className="p-4 flex justify-center bg-gray-300 rounded-md">
                    <h1 className="uppercase text-lg font-bold">login</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center justify-around flex-col gap-6 p-6 w-full">
                    <div>
                        <div className="max-w-64">
                            <label className="block mb-1 text-gray-500">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 w-64 rounded-md block"
                                required
                            />
                        </div>
                        <div className="mt-6 max-w-64">
                            <label className="block mb-1 text-gray-500">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 w-64 rounded-md block"
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <Button color="blue" text="Enviar" type="submit" />
                    <span>Não tem uma conta ainda? <Link href="/cadastro" className="text-blue-400 underline">Faça seu cadastro!</Link></span>
                </form>
            </div>
        </div>
    );
};
