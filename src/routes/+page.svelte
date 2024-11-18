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
	<h1>New game</h1>
	<h2>Add players</h2>
	<form onsubmit={addNewPlayer}>
		<div class="form-group">
			<label for="name" class="sr-only">Name</label>
			<input type="text" id="name" bind:value={playerToAdd} placeholder="Name" />
		</div>
		<button type="submit">Add player</button>
	</form>
	<h2>Players:</h2>
	{#if !game.players.length}
		<p>(No players added yet)</p>
	{:else}
		<table>
			<tbody>
				{#each game.players as player}
					<tr>
						<td>{player.name}</td>
						<td><button onclick={() => game.removePlayer(player.id)}>Delete</button></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<div>
		<a href="/game" onclick={startGame} class="button" class:ghosty={!gameCanStart}>Start game!</a>
	</div>
</div>
