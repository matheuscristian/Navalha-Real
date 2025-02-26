import { selectUserByEmail } from '@/utils/database';
import bcrypt from 'bcryptjs';
import { console } from 'inspector';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return new Response(JSON.stringify({ message: 'Email e senha são necessários' }), { status: 400 });
		}

		const user = await selectUserByEmail(email);
		
		if (!user) {
			return new Response(JSON.stringify({ message: 'Email ou senha inválidos' }), { status: 401 });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return new Response(JSON.stringify({ message: 'Email ou senha inválidos' }), { status: 401 });
		}

		const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, 'dntsf54nhh5zLIIQxJmBGReG3pLelaEIBqocjvvoyrw=', { expiresIn: '1h' });

		return new Response(
			JSON.stringify({ message: 'Login Sucedido', token }),
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'Algo deu errado' }), { status: 500 });
	}
}
