<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="./logo.png" />
</svelte:head>

{@render children?.()}
