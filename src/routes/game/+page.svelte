<script lang="ts">
	import { game } from '$lib/state/index.svelte'

	let pigLeft = $state('')
	let pigRight = $state('')
</script>

<div class="container">
	<ul>
		{#each game.players as player, idx}
			<li class:highlighted={idx === game.currentPlayer}>{player.name}</li>
		{/each}
	</ul>

	<form action="">
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
	</form>
</div>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
