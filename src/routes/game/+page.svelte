<script lang="ts">
	import { game } from '$lib/state/index.svelte'
	import { calculateScore } from '$lib/scripts/scoring'
	import { basePositionScores } from '$lib/scripts/scoring'

	let pigLeft = $state<keyof typeof basePositionScores | undefined>()
	let pigRight = $state<keyof typeof basePositionScores | undefined>()

	const handleSubmit = (e: Event) => {
		e.preventDefault()
		if (!pigLeft || !pigRight) return
		const set = [pigLeft, pigRight]
		if (set.includes('sider_down') && set.includes('sider_up')) {
			handleOinker()
			return
		}
		const scoreToAdd = calculateScore(pigLeft, pigRight)
		const { rolled } = game.getCurrentPlayer()
		game.updateCurrentPlayer({ rolled: rolled + scoreToAdd })
		resetPigs()
	}

	const handleOinker = () => {
		game.updateCurrentPlayer({ rolled: 0 })
		resetPigs()
		game.goToNextPlayer()
	}

	const handleDoubleSider = () => {
		game.updateCurrentPlayer({ rolled: game.getCurrentPlayer().rolled + 1 })
		resetPigs()
	}

	const handleBank = () => {
		const { rolled, banked } = game.getCurrentPlayer()
		game.updateCurrentPlayer({ rolled: 0, banked: banked + rolled })
		resetPigs()
		game.goToNextPlayer()
	}

	const resetPigs = () => {
		pigLeft = undefined
		pigRight = undefined
	}
</script>

<div class="container">
	<ul>
		{#each game.players as player, idx}
			<li class:highlighted={idx === game.currentPlayer}>
				{player.name}, rolled: {player.rolled}, banked: {player.banked}
			</li>
		{/each}
	</ul>

	<form action="" onsubmit={handleSubmit}>
		<div class="column">
			<label for="sider_down_left">
				<input
					type="radio"
					id="sider_down_left"
					value="sider_down"
					name="pig-left"
					bind:group={pigLeft}
				/>
				Sider (down)
			</label>
			<label for="sider_up_left">
				<input
					type="radio"
					id="sider_up_left"
					value="sider_up"
					name="pig-left"
					bind:group={pigLeft}
				/>
				Sider (up)
			</label>
			<label for="trotter_left">
				<input
					type="radio"
					id="trotter_left"
					value="trotter"
					name="pig-left"
					bind:group={pigLeft}
				/>
				Trotter
			</label>
			<label for="razorback_left">
				<input
					type="radio"
					id="razorback_left"
					value="razorback"
					name="pig-left"
					bind:group={pigLeft}
				/>
				Razorback
			</label>
			<label for="snouter_left">
				<input
					type="radio"
					id="snouter_left"
					value="snouter"
					name="pig-left"
					bind:group={pigLeft}
				/>
				Snouter
			</label>
			<label for="leaning_jowler_left">
				<input
					type="radio"
					id="leaning_jowler_left"
					value="leaning_jowler"
					name="pig-left"
					bind:group={pigLeft}
				/>
				Leaning Jowler
			</label>
		</div>
		<div class="column">
			<label for="sider_down_right">
				<input
					type="radio"
					id="sider_down_right"
					value="sider_down"
					name="pig-right"
					bind:group={pigRight}
				/>
				Sider (down)
			</label>
			<label for="sider_up_right">
				<input
					type="radio"
					id="sider_up_right"
					value="sider_up"
					name="pig-right"
					bind:group={pigRight}
				/>
				Sider (up)
			</label>
			<label for="trotter_right">
				<input
					type="radio"
					id="trotter_right"
					value="trotter"
					name="pig-right"
					bind:group={pigRight}
				/>
				Trotter
			</label>
			<label for="razorback_right">
				<input
					type="radio"
					id="razorback_right"
					value="razorback"
					name="pig-right"
					bind:group={pigRight}
				/>
				Razorback
			</label>
			<label for="snouter_right">
				<input
					type="radio"
					id="snouter_right"
					value="snouter"
					name="pig-right"
					bind:group={pigRight}
				/>
				Snouter
			</label>
			<label for="leaning_jowler_right">
				<input
					type="radio"
					id="leaning_jowler_right"
					value="leaning_jowler"
					name="pig-right"
					bind:group={pigRight}
				/>
				Leaning Jowler
			</label>
		</div>
		<button type="submit" disabled={!pigLeft || !pigRight}>Submit roll</button>
	</form>
	<div class="button-bar">
		<button onclick={handleDoubleSider}>Double sider</button>
		<button onclick={handleOinker}>Oinker</button>
		<button onclick={handleBank}>Bank</button>
	</div>
</div>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		& button[type='submit'] {
			grid-column: 1 / -1;
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.button-bar {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;

		button {
			flex: 1 1 auto;
		}
	}
</style>
