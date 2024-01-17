import { SECRET_MAP_TOKEN } from '$env/static/private'

export async function load() {
    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            map_token: SECRET_MAP_TOKEN
        }
    }
}