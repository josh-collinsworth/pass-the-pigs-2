import type { Player } from '$lib/data/types'
import { load, save } from '$lib/scripts/helpers'

const DEFAULT_GAME_STATE = {
	players: [],
	currentPlayer: 0
}

let newGameArgs = DEFAULT_GAME_STATE
const savedGame = load('game')

if (savedGame) {
	const { players, currentPlayer } = savedGame
	newGameArgs = { players, currentPlayer }
}

const createGameState = ({
	players = [],
	currentPlayer = 0
}: {
	players: Player[]
	currentPlayer: number
}) => {
	const gameState = $state({
		players,
		currentPlayer,
		isLoading: true,
		playersWhoHaveTakenFinalTurn: [] as string[],
		isFinalTurn() {
			return this.playersWhoHaveTakenFinalTurn.length
		},
		gameIsOver() {
			return this.playersWhoHaveTakenFinalTurn.length === this.players.length
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
			if (
				this.isFinalTurn() &&
				!this.playersWhoHaveTakenFinalTurn.includes(this.getCurrentPlayer().id)
			) {
				this.playersWhoHaveTakenFinalTurn.push(this.getCurrentPlayer().id)
			}
			this.checkIsGameOver()
			this.currentPlayer = (this.currentPlayer + 1) % this.players.length
			this.cleanup()
		},
		checkIsGameOver() {
			if (this.gameIsOver()) {
				const winningPlayer = this.players.sort((a, b) => b.banked - a.banked)[0]
				alert(`The game is over! ${winningPlayer.name} wins with ${winningPlayer.banked} points!`)
			}
			return
		},
		getCurrentPlayer() {
			return this.players[this.currentPlayer]
		},
		getCurrentPlayerId() {
			return this.players[this.currentPlayer].id
		},
		updateCurrentPlayer({ rolled, banked }: { rolled?: number; banked?: number }) {
			const isNewRolled = typeof rolled === 'number'
			const isNewBanked = typeof banked === 'number'
			this.players = this.players.map((player) => {
				if (player.id === this.getCurrentPlayerId()) {
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
