import type { PageLoad } from './$types';
import { urlBase, fetchData } from '$lib/config/site';
import { marked } from "marked";


export const load: PageLoad = async () => {
    try {
        const authorInfoResponse = await fetchData(urlBase + '/api/authors?populate=*');
        const authorInfo = authorInfoResponse.data[0];

        const authorGithubResponse = await fetchData("https://api.github.com/users/ddy-ddy");

        return {
            authrorInfo: {
                author: authorInfo.attributes.name,
                authorIconLink: urlBase + authorInfo.attributes.icon.data.attributes.url,
                authorLink: authorInfo.attributes.github,
                authorMotto: authorInfo.attributes.motto,
                authorProfile: marked(authorInfo.attributes.profile),
                authorGithubLocation: authorGithubResponse.location,
                authorGithubFollowers: authorGithubResponse.followers,
            }
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}