import { fail } from '@sveltejs/kit';
import { setError, superValidate, type ErrorStatus } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { loadFlash } from 'sveltekit-flash-message/server';
import login from '$lib/server/controllers/login.js';
import { generateHTTPResonse } from '../../helpers/generateHTTPresponse.js';

const schema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export const load = loadFlash(async function Load({ parent }) {
	await parent();
	console.log('awaited parent');

	const form = await superValidate(zod(schema));

	return { form };
});

export const actions = {
	default: async function defaultAction({ request, cookies }) {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt } = await login(form.data);
			cookies.set('token', token, {
				path: '/',
				expires: new Date(tokenExpiresAt * 1000),
				httpOnly: false,
			});
			cookies.set('refresh_token', refreshToken, {
				path: '/',
				expires: new Date(refreshTokenExpiresAt * 1000),
				httpOnly: false,
			});

			console.log('set cookies');

			return { form };
		} catch (error) {
			const { status, message: errorMessage } = generateHTTPResonse(error);

			console.log('login error', error);

			return setError(form, errorMessage, {
				status: status as ErrorStatus,
			});
		}
	},
};
