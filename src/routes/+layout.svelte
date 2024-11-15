<script>
	import { goto } from '$app/navigation'
	let { children } = $props()
	import { game } from '$lib/state/index.svelte'
	import { onMount } from 'svelte'

	onMount(() => {
		if (game.players.length >= 2) {
			goto('/game')
		} else if (window.location.href.includes('game')) {
			goto('/')
		}
		game.isLoading = false
	}) // Lets us be sure localStorage has had time to load
</script>

<svelte:head>
	<link rel="stylesheet" href="style.css" />
</svelte:head>

{#if !game.isLoading}
	{@render children()}
{:else}
	<p>Loading...</p>
{/if}
