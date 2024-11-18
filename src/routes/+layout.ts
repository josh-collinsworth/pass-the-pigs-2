import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ url }) => {
	const path = url.pathname

	return {
		path
	}
}
