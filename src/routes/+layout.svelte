<script>
	let { children } = $props()
	import { game } from '$lib/state/index.svelte'
	import { onMount } from 'svelte'

	onMount(() => (game.isLoading = false)) // Lets us be sure localStorage has had time to load
</script>

<svelte:head>
	<link rel="stylesheet" href="style.css" />
</svelte:head>

{#if !game.isLoading}
	{@render children()}
{:else}
	<p>Loading...</p>
{/if}
