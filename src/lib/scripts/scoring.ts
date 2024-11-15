type PigPosition = keyof typeof basePositionScores

export const basePositionScores = {
	sider_up: 0,
	sider_down: 0,
	trotter: 5,
	razorback: 5,
	snouter: 10,
	leaning_jowler: 15
}

export const calculateScore = (
	left: PigPosition | undefined,
	right: PigPosition | undefined
): number => {
	if (!left || !right) return 0
	let double = false
	if (left === right) {
		double = true
		if (left === 'sider_up' || left === 'sider_down') {
			return 1
		} else {
			return basePositionScores[left] * 4
		}
	} else {
		return basePositionScores[left] + basePositionScores[right]
	}
}
