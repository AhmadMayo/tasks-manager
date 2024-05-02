<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	let { children } = $props();
	initializeStores();
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-8 px-4 md:flex-row md:p-12"
	use:autoAnimate={{ duration: 150 }}
>
	<div class="flex shrink-0 grow-0 basis-1/2 flex-col items-start gap-8 md:pb-28">
		<div
			class="gradient-heading text-5xl leading-snug md:text-6xl md:font-semibold md:leading-snug"
		>
			Tasks Manager
		</div>
		<p class="hidden text-2xl leading-normal md:block">
			The best place to track the things you have to do. Easy to use, great experience*, and totally
			<strong>free</strong>.
		</p>
		<p class="hidden text-xs md:block">
			* Due to the nature of the application, the db is limited only to 5 users, and 10 tasks per
			user. Use at your own risk.
		</p>
	</div>
	{@render children()}
</main>
<Modal />
<Toast />
