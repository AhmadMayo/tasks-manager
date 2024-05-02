import { redirect } from '@sveltejs/kit';

export function load({ url, cookies, depends }) {
	depends('user:token');

	const token = cookies.get('token');
	console.log('token', token);

	if (!token) {
		return;
	}

	const redirectURL = url.searchParams.get('redirect_url') || '/';

	redirect(307, redirectURL);
}
