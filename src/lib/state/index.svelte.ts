import type { Player } from '$lib/data/types'
import { load, save } from '$lib/scripts/helpers'

const DEFAULT_GAME_STATE = {
	players: [],
	currentPlayerIndex: 0
}

let newGameArgs = DEFAULT_GAME_STATE
const savedGame = load('game')

if (savedGame) {
	const { players, currentPlayerIndex } = savedGame
	newGameArgs = { players, currentPlayerIndex }
}

const createGameState = ({
	players = [],
	currentPlayerIndex = 0
}: {
	players: Player[]
	currentPlayerIndex: number
}) => {
	const gameState = $state({
		players,
		currentPlayerIndex,
		isLoading: true,
		playersWhoHaveTakenFinalTurn: [] as string[],
		get isFinalTurn() {
			return this.playersWhoHaveTakenFinalTurn.length
		},
		get gameIsOver() {
			return this.playersWhoHaveTakenFinalTurn.length === this.players.length
		},
		get currentlyWinningPlayer() {
			return this.players.find(
				(player: Player) =>
					player.banked === Math.max(...this.players.map((player) => player.banked))
			)
		},
		createNewPlayer(name: string) {
			if (!name) return
			const newPlayer = {
				id: crypto.randomUUID(),
				name: name,
				banked: 0,
				rolled: 0
			}
			this.players = [...this.players, newPlayer]
			this.cleanup()
		},
		removePlayer(id: string) {
			this.players = this.players.filter((player) => player.id !== id)
			this.cleanup()
		},
		cleanup() {
			save('game', this)
		},
		goToNextPlayer() {
			if (this.isFinalTurn && !this.playersWhoHaveTakenFinalTurn.includes(this.currentPlayer.id)) {
				this.playersWhoHaveTakenFinalTurn.push(this.currentPlayer.id)
			}
			this.checkIsGameOver()
			this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
			this.cleanup()
		},
		checkIsGameOver() {
			if (this.gameIsOver) {
				const winningPlayer = this.currentlyWinningPlayer
				alert(`The game is over! ${winningPlayer.name} wins with ${winningPlayer.banked} points!`)
			}
			return
		},
		get currentPlayer() {
			return this.players[this.currentPlayerIndex]
		},
		get currentPlayerId() {
			return this.players[this.currentPlayerIndex].id
		},
		updateCurrentPlayer({ rolled, banked }: { rolled?: number; banked?: number }) {
			const isNewRolled = typeof rolled === 'number'
			const isNewBanked = typeof banked === 'number'
			this.players = this.players.map((player) => {
				if (player.id === this.currentPlayerId) {
					return {
						...player,
						rolled: isNewRolled ? rolled : player.rolled,
						banked: isNewBanked ? banked : player.banked
					}
				}
				return player
			})
		}
	})
	return gameState
}

export const game = createGameState(newGameArgs)
