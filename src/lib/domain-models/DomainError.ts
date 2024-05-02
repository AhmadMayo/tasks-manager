export default interface DomainError {
	key: 'unauthenticated' | 'invalid_arguments' | 'internal_server_error';
	message: string;
}

export function isDomainError(value: unknown): value is DomainError {
	return Boolean(
		// is an object
		typeof value == 'object' &&
			// is not null
			value &&
			// has a property named `key`
			'key' in value &&
			// has a property named `message`
			'message' in value
	);
}
