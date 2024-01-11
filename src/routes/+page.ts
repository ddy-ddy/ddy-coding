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

async function loadGithubRepoData() {
    try {
        const response = await fetchData("https://api.github.com/users/ddy-ddy/repos");
        // 查找指定名称的仓库
        const repoNames = ['cs-408', 'ddy-coding', 'build-kg'];
        const repos = response.filter((repo: any) => { return repoNames.includes(repo.name) });
        const reposInfo = repos.map((repo: any) => {
            return {
                name: repo.name,
                description: repo.description,
                language: repo.language,
                star: repo.stargazers_count,
                fork: repo.forks_count,
                link: repo.html_url
            }
        })
        return reposInfo;
    } catch (error) {
        return [];
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
            authorProfile: marked(authorInfo.attributes.profile)
        };

        const githubData = {
            authorGithubLocation: 'Guan Zhou',
            authorGithubFollowers: '',
            authorGithubRepo: []
        }


        // 加载github主页内容
        const authorGithubResponse = await authorGithubPromise;
        githubData.authorGithubLocation = authorGithubResponse.location;
        githubData.authorGithubFollowers = authorGithubResponse.followers;

        // 加载github仓库内容
        const authorGithubRepoData = await loadGithubRepoData();
        githubData.authorGithubRepo = authorGithubRepoData;

        return {
            authorInfo: initialData,
            githubInfo: githubData
        }

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}




