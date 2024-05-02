<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { getFlash } from 'sveltekit-flash-message';
	import { Confetti } from 'svelte-confetti';
	import EyeIcon from 'virtual:icons/mdi/eye';
	import EyeOffIcon from 'virtual:icons/mdi/eye-off';
	import LoadingIcon from 'virtual:icons/mdi/loading';

	const flash = getFlash(page);

	const { data } = $props();
	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		validationMethod: 'auto',
		invalidateAll: false,
	});
	let isPasswordHidden = $state(true);
	$effect(() => {
		console.log('errors', $errors);
	});
</script>

<div class="card h-full w-full shrink-0 grow-0 basis-1/2 p-4 md:max-w-lg">
	<h1 class="mb-8 text-2xl font-semibold">Login</h1>

	{#if $flash}
		<div class="alert variant-filled-success mb-2">
			<div class="flex w-full">
				<Confetti x={[1, 2]} cone destroyOnComplete={false} />
				<div class="grow">{$flash.message}</div>
				<Confetti x={[-2, -1]} cone destroyOnComplete={false} />
			</div>
		</div>
	{/if}

	{#if $errors._errors}
		<span class="alert variant-soft-error" transition:scale|local={{ duration: 75 }}>
			{$errors._errors.join(', ')}
		</span>
	{/if}

	<form class="flex flex-col gap-4" method="POST" use:enhance>
		<label class="label">
			<span>Email</span>
			<input
				type="email"
				name="email"
				class={`input ${$errors.email ? 'input-error' : ''}`}
				placeholder="email@example.com"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
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
					{...$constraints.password}
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
				Login
			</button>
		</div>
	</form>

	<div>
		Don't have an account? <a href="/sign-up" class="anchor">Sign up</a>
	</div>
</div>
