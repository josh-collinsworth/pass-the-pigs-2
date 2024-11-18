<script>
	import { game } from '$lib/state/index.svelte'
</script>

<ul>
	{#each game.players as player, idx}
		<li class:highlighted={idx === game.currentPlayerIndex}>
			{player.name}, rolled: {player.rolled}, banked: {player.banked}
		</li>
	{/each}
</ul>
