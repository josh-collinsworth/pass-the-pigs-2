<script lang="ts">
	import { game } from '$lib/state/index.svelte'

	let playerToAdd = $state('')

	const addNewPlayer = (e) => {
		e.preventDefault()
		game.players = [...game.players, { name: playerToAdd, banked: 0, rolled: 0 }]
		playerToAdd = ''
	}

	const startGame = () => {
		// game.started = true
	}
</script>

<div class="container">
	<h1>Add players</h1>
	<form onsubmit={addNewPlayer}>
		<div class="form-group">
			<label for="name">Name</label>
			<input type="text" id="name" bind:value={playerToAdd} />
			{playerToAdd}
		</div>
		<button type="submit">Add player</button>
	</form>
	<h2>Players:</h2>
	{#if !game.players.length}
		<p>(No players added yet)</p>
	{:else}
		<ul>
			{#each game.players as player}
				<li>{player.name}</li>
			{/each}
		</ul>
	{/if}

	<div>
		<button onclick={startGame} disabled={game.players.length < 2}>Start game!</button>
	</div>
</div>

<style>
</style>
