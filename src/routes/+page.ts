import { error } from '@sveltejs/kit'

export const load = async () => {
    try {
        // @ts-ignore
        const ReadMeFile = await import('../content/index.md')
        const ReadMe = ReadMeFile.default

        return {
            ReadMe
        }
    }
    catch (err) {
        // @ts-ignore
        throw error(500, err)
    }
}
