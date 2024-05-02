import { fail } from '@sveltejs/kit';
import { superValidate, type ErrorStatus, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from 'sveltekit-flash-message/server';
import signup from '$lib/server/controllers/signup.js';
import { generateHTTPResonse } from '../../helpers/generateHTTPresponse.js';

const schema = z.object({
	name: z
		.string()
		.regex(/^\S/, {
			message: 'Cannot start with whitespace',
		})
		.regex(/\S$/, {
			message: 'Cannot end with whitespace',
		})
		.min(1, { message: 'Please enter your name' }),
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z
		.string()
		.regex(/^(?=.*[0-9]).+$/, {
			message: 'Must contain a number',
		})
		.regex(/^(?=.*[a-z]).+$/, {
			message: 'Must contain a small letter',
		})
		.regex(/^(?=.*[A-Z]).+$/, {
			message: 'Must contain a capital letter',
		})
		.regex(/^(?=.*\W).+$/, {
			message: 'Must contain a special character',
		})
		.min(8, { message: 'Must be at least 8 characters' }),
});

export async function load() {
	const form = await superValidate(zod(schema));

	return { form };
}

export const actions = {
	default: async function defaultAction({ request, cookies }) {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		try {
			await signup(form.data);
		} catch (error) {
			const { status, message: errorMessage } = generateHTTPResonse(error);

			return setError(form, 'email', errorMessage, {
				status: status as ErrorStatus,
			});
		}

		redirect(
			307,
			'/login',
			{
				type: 'success',
				message: 'Signed up successfully',
			},
			cookies,
		);
	},
};
