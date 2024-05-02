import { isDomainError, type DomainError } from '$lib/domain-models';

type HTTPStatus = {
	[Key in DomainError['key']]: number;
};
const httpStatuses: HTTPStatus = {
	unauthenticated: 401,
	invalid_arguments: 400,
	internal_server_error: 500,
};

interface GenerateHTTPResonse {
	status: number;
	message: string;
}
export function generateHTTPResonse(error: unknown): GenerateHTTPResonse {
	if (!isDomainError(error)) {
		return {
			status: 500,
			message: 'Internal Server Error',
		};
	}

	return {
		status: httpStatuses[error.key],
		message: error.message,
	};
}
