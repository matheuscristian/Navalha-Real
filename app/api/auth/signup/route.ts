import { selectUserByEmail, setNewUser } from '@/utils/database';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: 'Nome, email e senha são necessários' }), { status: 400 });
        }

        if (await selectUserByEmail(email)) {
            return new Response(JSON.stringify({ message: 'Email já existe' }), { status: 400 });
        }

        setNewUser(name, email, bcrypt.hashSync(password))

        return new Response(
            JSON.stringify({ message: 'Cadastro Sucedido' }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Algo deu errado' }), { status: 500 });
    }
}
