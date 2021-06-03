import React from 'react';
import { providers, signIn, getSession, csrfToken } from 'next-auth/client';

export default function SignIn({ providers, csrfToken }) {
	return (
		<div>
			<h1>Welcome to our custome page</h1>
			<div>
				<form method='post' action='/api/auth/signin/email'>
					<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
					<label>
						Email Address
						<input type='text' id='email' name='email' />
					</label>
					<button type='submit'>Use your email</button>
				</form>
			</div>

			<div>
				{Object.values(providers).map((provider) => {
					if (provider.name === 'Email') {
						return;
					}
					return (
						<div key={provider.name}>
							<button onClick={() => signIn(provider.id)}>
								Sign In with {provider.name}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

SignIn.getInitialProps = async (context) => {
	const { req, res } = context;
	const session = await getSession({ req });

	if (session && res && session.accessToken) {
		res.writeHead(302, {
			Location: '/',
		});
		res.end();
		return;
	}

	return {
		session: undefined,
		providers: await providers(context),
		csrfToken: await csrfToken(context),
	};
};
