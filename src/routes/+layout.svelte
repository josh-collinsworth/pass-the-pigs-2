<script>
	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="style.css" />
</svelte:head>

{@render children()}
