<script>
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import '../app.pcss';
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>
<slot></slot>
