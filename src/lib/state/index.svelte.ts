import type { Player } from '$lib/data/types'
import { save } from '$lib/scripts/helpers'

export const game = $state({
	players: [] as Player[],
	createNewPlayer(name: string) {
		const newPlayer = {
			id: crypto.randomUUID(),
			name: name,
			banked: 0,
			rolled: 0
		}
		this.players = [...this.players, newPlayer]
		this.syncStateToLocalStorage()
	},
	removePlayer(id: string) {
		this.players = this.players.filter((player) => player.id !== id)
		this.syncStateToLocalStorage()
	},
	syncStateToLocalStorage() {
		save('game', this)
	}
})
