import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home({ isConnected }) {
	const [session, loading] = useSession();

	return (
		<div className='container'>
			<Head>
				<title>Auth Examples</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{!session && (
					<>
						Not Signed In <br /> <button onClick={signIn}>Sign In</button>
					</>
				)}
				{session && (
					<>
						Sign in as {session.user.email} <br />
						<div>You can now access secret pages</div>
						<button>
							<Link href='/secret'> To the secret</Link>
						</button>
						<button onClick={signOut}>Sign Out</button>
					</>
				)}
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
	};
}
