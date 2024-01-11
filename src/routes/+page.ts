import type { PageLoad } from './$types';
import { urlBase, fetchData } from '$lib/config/site';
import { marked } from "marked";

async function loadGithubData() {
    try {
        const response = await fetchData("https://api.github.com/users/ddy-ddy");
        return response;
    } catch (error) {
        return { location: 'Guan Zhou', followers: 'unknown' };
    }
}

export const load: PageLoad = async () => {
    try {
        const authorInfoResponse = await fetchData(urlBase + '/api/authors?populate=*');
        const authorInfo = authorInfoResponse.data[0];

        const authorGithubPromise = loadGithubData();

        const initialData = {
            author: authorInfo.attributes.name,
            authorIconLink: urlBase + authorInfo.attributes.icon.data.attributes.url,
            authorLink: authorInfo.attributes.github,
            authorMotto: authorInfo.attributes.motto,
            authorProfile: marked(authorInfo.attributes.profile),
            authorGithubLocation: 'Guan Zhou',
            authorGithubFollowers: '',
        };

        // 当 GitHub 数据加载完成后，更新内容
        const authorGithubResponse = await authorGithubPromise;
        initialData.authorGithubLocation = authorGithubResponse.location;
        initialData.authorGithubFollowers = authorGithubResponse.followers;

        return {
            authorInfo: initialData
        }

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}