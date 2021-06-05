import { connectToDatabase } from '../../../util/mongodb';
import { hashPassword } from '../../../util/auth';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}

	const data = req.body;

	const { email, password } = data;

	if (
		!email ||
		!email.includes('@') ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message: 'Invalid input - password should be at least 7 char long.',
		});
		return;
	}

	const { db } = await connectToDatabase();

	const hashedPassword = await hashPassword(password);

	const result = await db.collection('users').insertOne({
		email: email,
		password: hashedPassword,
	});

	res.status(201).json({ message: 'Created user' });
}

export default handler;
