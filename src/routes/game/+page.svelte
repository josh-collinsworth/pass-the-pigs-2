<script lang="ts">
	import { game } from '$lib/state/index.svelte'
	import { calculateScore } from '$lib/scripts/scoring'
	import { basePositionScores } from '$lib/scripts/scoring'
	import { save } from '$lib/scripts/helpers'
	import { goto } from '$app/navigation'

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
		const { rolled } = game.currentPlayer
		game.updateCurrentPlayer({ rolled: rolled + scoreToAdd })
		resetPigs()
	}

	const handleOinker = () => {
		game.updateCurrentPlayer({ rolled: 0 })
		resetPigs()
		game.goToNextPlayer()
	}

	const handleDoubleSider = () => {
		game.updateCurrentPlayer({ rolled: game.currentPlayer.rolled + 1 })
		resetPigs()
	}

	const handleBank = () => {
		const { rolled, banked } = game.currentPlayer
		game.updateCurrentPlayer({ rolled: 0, banked: banked + rolled })
		if (game.currentPlayer.banked >= 100 && !game.playersWhoHaveTakenFinalTurn.length) {
			alert(
				`${game.currentPlayer.name} Has banked with ${game.currentPlayer.banked} points! Every other player now gets one more turn.`
			)
			game.playersWhoHaveTakenFinalTurn.push(game.currentPlayer.id)
		}

		resetPigs()
		game.goToNextPlayer()
	}

	const resetPigs = () => {
		pigLeft = undefined
		pigRight = undefined
	}
</script>

<div class="container">
	<div>
		<p>
			<b>{game.currentPlayer.name}</b> - Banked: {game.currentPlayer.banked} / Turn: {game
				.currentPlayer.rolled}
		</p>
		<p>
			Current leader:
			{game.currentlyWinningPlayer.name}, with {game.currentlyWinningPlayer.banked}
		</p>
	</div>

	<form action="" onsubmit={handleSubmit}>
		<label for="sider_down_left">
			<input
				type="radio"
				class="sr-only"
				id="sider_down_left"
				value="sider_down"
				name="pig-left"
				bind:group={pigLeft}
			/>
			<img src="/images/dot-down.png" alt="Sider (down)" />
		</label>
		<label for="sider_down_right">
			<input
				type="radio"
				class="sr-only"
				id="sider_down_right"
				value="sider_down"
				name="pig-right"
				bind:group={pigRight}
			/>
			<img src="/images/dot-down.png" alt="Sider (down)" />
		</label>
		<label for="sider_up_left">
			<input
				type="radio"
				class="sr-only"
				id="sider_up_left"
				value="sider_up"
				name="pig-left"
				bind:group={pigLeft}
			/>
			<img src="/images/dot-up.png" alt="Sider (up)" />
		</label>
		<label for="sider_up_right">
			<input
				type="radio"
				class="sr-only"
				id="sider_up_right"
				value="sider_up"
				name="pig-right"
				bind:group={pigRight}
			/>
			<img src="/images/dot-up.png" alt="Sider (up)" />
		</label>
		<label for="trotter_left">
			<input
				type="radio"
				class="sr-only"
				id="trotter_left"
				value="trotter"
				name="pig-left"
				bind:group={pigLeft}
			/>
			<img src="/images/trotter.png" alt="Trotter" />
		</label>
		<label for="trotter_right">
			<input
				type="radio"
				class="sr-only"
				id="trotter_right"
				value="trotter"
				name="pig-right"
				bind:group={pigRight}
			/>
			<img src="/images/trotter.png" alt="Trotter" />
		</label>
		<label for="razorback_left">
			<input
				type="radio"
				class="sr-only"
				id="razorback_left"
				value="razorback"
				name="pig-left"
				bind:group={pigLeft}
			/>
			<img src="/images/razorback.png" alt="Razorback" />
		</label>
		<label for="razorback_right">
			<input
				type="radio"
				class="sr-only"
				id="razorback_right"
				value="razorback"
				name="pig-right"
				bind:group={pigRight}
			/>
			<img src="/images/razorback.png" alt="Razorback" />
		</label>
		<label for="snouter_left">
			<input
				type="radio"
				class="sr-only"
				id="snouter_left"
				value="snouter"
				name="pig-left"
				bind:group={pigLeft}
			/>
			<img src="/images/snouter.png" alt="Snouter" />
		</label>
		<label for="snouter_right">
			<input
				type="radio"
				class="sr-only"
				id="snouter_right"
				value="snouter"
				name="pig-right"
				bind:group={pigRight}
			/>
			<img src="/images/snouter.png" alt="Snouter" />
		</label>
		<label for="leaning_jowler_left">
			<input
				type="radio"
				class="sr-only"
				id="leaning_jowler_left"
				value="leaning_jowler"
				name="pig-left"
				bind:group={pigLeft}
			/>
			<img src="/images/leaning-jowler.png" alt="Leaning Jowler" />
		</label>
		<label for="leaning_jowler_right">
			<input
				type="radio"
				class="sr-only"
				id="leaning_jowler_right"
				value="leaning_jowler"
				name="pig-right"
				bind:group={pigRight}
			/>
			<img src="/images/leaning-jowler.png" alt="Leaning Jowler" />
		</label>

		<button type="submit" disabled={!pigLeft || !pigRight}>Submit roll</button>
	</form>
	<div class="button-bar">
		<button onclick={handleDoubleSider}>Double sider</button>
		<button onclick={handleOinker}>Oinker</button>
		<button onclick={handleBank}>Bank</button>
	</div>
</div>
{#if game.gameIsOver}
	<button
		onclick={() => {
			save('game', null)
			game.players = []
			goto('/')
		}}>New Game</button
	>
{/if}

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows:
			minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)
			auto;
		gap: 0.5rem;

		& button[type='submit'] {
			grid-column: 1 / -1;
		}
	}

	.button-bar {
		display: flex;
		gap: 0.5rem;

		button {
			flex: 1 1 auto;
		}
	}

	form img,
	form label {
		touch-action: manipulation;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	form img {
		user-select: none;
		pointer-events: none;
		width: auto;
		height: 100%;
		margin: auto;
		position: absolute;
		inset: 0;
	}

	form label {
		padding: 0.25rem;
		border: 1.5px solid #ccc;
		border-radius: 0.25rem;
		width: 100%;
		height: auto;
	}

	form label:has(input:checked) {
		opacity: 1;
		background: var(--color-b);
		border-color: var(--color-);
	}

	.container {
		height: calc(100vh - var(--header-height));
		height: calc(100dvh - var(--header-height));

		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: auto 1fr auto;

		& p {
			margin: 0;
		}
	}
</style>
