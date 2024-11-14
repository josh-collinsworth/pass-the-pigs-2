import type { Player } from '$lib/data/types'

class GameState {
	#players = $state<Player[]>([])

	get players() {
		return this.#players
	}
	set players(players: Player[]) {
		this.#players = players
	}
}

export const game = new GameState()
