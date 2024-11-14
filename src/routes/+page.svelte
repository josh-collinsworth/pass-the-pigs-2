<script lang="ts">
	import { game } from '$lib/state/index.svelte'

	let playerToAdd = $state('')

	const addNewPlayer = (e: Event) => {
		e.preventDefault()
		game.createNewPlayer(playerToAdd)
		playerToAdd = ''
	}

	const gameCanStart = $derived(game.players.length >= 2)

	const startGame = (e: Event) => {
		if (!gameCanStart) {
			e.preventDefault()
		}
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
				<li>{player.name} <button onclick={() => game.removePlayer(player.id)}>Delete</button></li>
			{/each}
		</ul>
	{/if}

	<div>
		<a href="/game" onclick={startGame} class:ghosty={!gameCanStart}>Start game!</a>
	</div>
</div>
