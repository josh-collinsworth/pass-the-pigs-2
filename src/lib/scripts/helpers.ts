export const load = (str: string) => {
	// Load string from local storage
	const item = localStorage.getItem(str)
	if (item) {
		return JSON.parse(item)
	}
	return null
}

export const save = (str: string, obj: any) => {
	// Save string to local storage
	console.log(obj)
	console.log(JSON.stringify(obj))
	localStorage.setItem(str, JSON.stringify(obj))
}
