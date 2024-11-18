<script>
	import { goto } from '$app/navigation'
	let { children, data } = $props()
	import { game } from '$lib/state/index.svelte'
	import { onMount } from 'svelte'
	import { circIn, circOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	const slideY = 12

	onMount(() => {
		game.isLoading = false
	}) // Lets us be sure localStorage has had time to load
</script>

<svelte:head>
	<link rel="stylesheet" href="/style.css" />
</svelte:head>

<header style="height: var(--header-height); padding: 1rem;">
	<a href="/">Home</a> | <a href="/game">Game</a> | <a href="/game/scoreboard">Scoreboard</a>
</header>
{#key data.path}
	<div
		in:fly={{ delay: 240, duration: 160, y: slideY, easing: circOut }}
		out:fly={{ duration: 160, y: -slideY, easing: circIn }}
	>
		{#if !game.isLoading}
			{@render children()}
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
{/key}
