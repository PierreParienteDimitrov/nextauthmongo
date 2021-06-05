import { useRef } from 'react';

// Create User /api/auth/signup
async function createUser(email, password) {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
}

// Sign up form
function SignUpForm() {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	// Submit Function
	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		console.log(enteredEmail);

		// Add Validation

		try {
			const result = await createUser(enteredEmail, enteredPassword);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<section>
			<h1>Sign Up</h1>
			<form onSubmit={submitHandler}>
				{/* Email */}
				<div>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				{/* Password */}
				<div>
					<label htmlFor='password'>Your Password</label>
					<input type='password' id='password' required ref={passwordInputRef} />
				</div>
				{/* Actions */}
				<div>
					<button>Sign Up</button>
				</div>
			</form>
		</section>
	);
}

export default SignUpForm;
