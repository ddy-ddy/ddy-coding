import type { PageLoad } from './$types';
import { urlBase, fetchData } from '$lib/config/site';
import { marked } from "marked";

async function loadGithubData() {
    try {
        const response = await fetchData("https://api.github.com/users/ddy-ddy");
        return { location: response.location, followers: response.followers };
    } catch (error) {
        return {}
    }
}

async function loadGithubRepoData() {
    try {
        const response = await fetchData("https://api.github.com/users/ddy-ddy/repos");
        // 查找指定名称的仓库
        const repoNames = ['cs-408', 'build-kg', 'ddy-coding',];
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
        // 按照star数量排序
        reposInfo.sort((a: any, b: any) => {
            return b.star - a.star;
        })
        return reposInfo;
    } catch (error) {
        return [];
    }
}

async function loadBilibiliData() {
    try {
        const response = await fetchData(urlBase + "/api/videos?sort=create_time:desc");
        const videos = response.data;
        const videoInfo = videos.map((video: any) => {
            return {
                name: video.attributes.name,
                url: video.attributes.url,
                time: video.attributes.time,
                create_time: video.attributes.create_time,
                img_url: video.attributes.img_url
            }
        })
        return videoInfo
    } catch (error) {
        return [];
    }
}

export const load: PageLoad = async () => {
    try {
        const authorInfoResponse = await fetchData(urlBase + '/api/authors?populate=*');
        const authorInfo = authorInfoResponse.data[0];

        const initialData = {
            author: authorInfo.attributes.name,
            authorIconLink: urlBase + authorInfo.attributes.icon.data.attributes.url,
            authorLink: authorInfo.attributes.github,
            authorMotto: authorInfo.attributes.motto,
            authorProfile: marked(authorInfo.attributes.profile)
        };

        // 加载github主页内容
        const githubData = loadGithubData();

        // 加载github仓库内容
        const githubRepoData = loadGithubRepoData();

        // 加载bilibili视频内容
        const videoInfo = loadBilibiliData();

        return {
            authorInfo: initialData,
            githubInfo: githubData,
            githubRepoInfo: githubRepoData,
            videoInfo: videoInfo
        }

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}




