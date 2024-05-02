<script lang="ts">
	import { fly, fade, blur, crossfade, draw, scale, slide } from 'svelte/transition';
	import { get } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms';
	import AlertIcon from 'virtual:icons/mdi/alert';
	import EyeIcon from 'virtual:icons/mdi/eye';
	import EyeOffIcon from 'virtual:icons/mdi/eye-off';
	import LoadingIcon from 'virtual:icons/mdi/loading';

	const { data } = $props();
	const { form, errors, message, enhance, submitting } = superForm(data.form, {
		validationMethod: 'auto',
		invalidateAll: false,
	});

	let isPasswordHidden = $state(true);
</script>

<div class="card h-full w-full shrink-0 grow-0 basis-1/2 p-4 md:max-w-lg">
	<h1 class="mb-4 text-lg font-semibold">Sign up</h1>

	<span class="alert variant-filled-tertiary mb-4">
		<AlertIcon width="2.5em" height="2.5em" class="shrink-0" />
		<div class="alert-message">
			<h2 class="h3">Caution</h2>
			<p>
				This is only a demo app, so its database is intentionally limited. The maximum number of
				users is 5. Attempting to create a 6th user will result in deletion of the oldest account
			</p>
		</div>
	</span>

	<form class="flex flex-col gap-4" method="POST" use:enhance>
		<label class="label">
			<span>Name</span>
			<input
				type="text"
				name="name"
				class={`input ${$errors.name ? 'input-error' : ''}`}
				placeholder="John Doe"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
			/>
		</label>
		{#if $errors.name}
			<span class="alert variant-soft-error" transition:scale|local={{ duration: 75 }}>
				{$errors.name.join(', ')}
			</span>
		{/if}

		<label class="label">
			<span>Email</span>
			<input
				type="email"
				name="email"
				class={`input ${$errors.email ? 'input-error' : ''}`}
				placeholder="email@example.com"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
			/>
		</label>
		{#if $errors.email}
			<span class="alert variant-soft-error" transition:scale|local={{ duration: 75 }}>
				{$errors.email.join(', ')}
			</span>
		{/if}

		<div class="label">
			<label for="password">Password</label>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type={isPasswordHidden ? 'password' : 'text'}
					id="password"
					name="password"
					class={`input grow rounded-e-none focus:outline-none focus-visible:outline-none ${$errors.password ? 'input-error' : ''}`}
					class:input-error={get(errors).password}
					placeholder="P@ssw0rd"
					aria-invalid={$errors.password ? 'true' : undefined}
					bind:value={$form.password}
				/>
				<button
					class="variant-filled-secondary !grid grow-0 grid-cols-1 grid-rows-1"
					type="button"
					onclick={() => (isPasswordHidden = !isPasswordHidden)}
				>
					{#if isPasswordHidden}
						<span
							class="col-start-1 col-end-2 row-start-1 row-end-2"
							transition:fly|local={{ y: -50, duration: 75 }}
						>
							<EyeIcon />
						</span>
					{:else}
						<span
							class="col-start-1 col-end-2 row-start-1 row-end-2"
							transition:fly|local={{ y: 50, duration: 75 }}
						>
							<EyeOffIcon />
						</span>
					{/if}
				</button>
			</div>
		</div>
		{#if $errors.password}
			<span class="alert variant-soft-error" transition:scale|local={{ duration: 75 }}>
				{$errors.password.join(', ')}
			</span>
		{/if}

		<div class="flex justify-end">
			<button type="submit" class="variant-filled-primary btn" disabled={$submitting}>
				{#if $submitting}
					<LoadingIcon class="animate-spin " />
				{/if}
				<span> Sign up </span>
			</button>
		</div>
	</form>

	<div>
		Already have an account? <a href="/login" class="anchor">Login</a>
	</div>
</div>
