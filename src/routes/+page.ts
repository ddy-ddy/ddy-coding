import type { PageLoad } from './$types';
import { urlBase, fetchData } from '$lib/config/site';
import { marked } from "marked";


export const load: PageLoad = async () => {
    try {
        const authorInfoResponse = await fetchData(urlBase + '/api/authors?populate=*');
        const authorInfo = authorInfoResponse.data[0];
        return {
            authrorInfo: {
                author: authorInfo.attributes.name,
                authorIconLink: urlBase + authorInfo.attributes.icon.data.attributes.url,
                authorLink: authorInfo.attributes.github,
                authorMotto: authorInfo.attributes.motto,
                authorProfile: marked(authorInfo.attributes.profile)
            }
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}