export const urlBase = "https://strapi.ddycoding.cn";
export const urlListBlog = urlBase + "/api/blogs?fields=title&fields=summary&fields=publishedAt&populate=author&populate=blog_categories&sort=publishedAt:desc"


export const siteConfig = {
    siteInfo: {
        "title": "ddy's website",
        "description": "This is my personal website",
        "author": "ddy",
        "email": "duanyunlp@gmail.com"
    },
    socialNav: [
        { "name": "github", "iconPath": "", "url": "https://github.com/ddy-ddy" },
        { "name": "X", "iconPath": "", "url": "https://twitter.com/ddy_coding" }
    ],
    mainNav: [
        { "name": "首页", "path": "/" },
        { "name": "博客", "path": "/blogs" },
        { "name": "摄影", "path": "/pictures" },
        // { "name": "骑行", "path": "/bicycles" },
    ],
    codingInfo: [
        { "name": "数据产品经理", "color": "fill-red-200 dark:fill-red-600" },
        { "name": "Svelte", "color": "fill-orange-200 dark:fill-orange-600" },
        { "name": "Python", "color": "fill-sky-200 dark:fill-sky-600" },
        { "name": "SQL", "color": "fill-amber-200 dark:fill-amber-600" },
        { "name": "JavaScript", "color": "fill-ddy-200 dark:fill-ddy-600" },
        { "name": "Excel", "color": "fill-yellow-200 dark:fill-yellow-600" },
    ],
}
export const logoRingStyle = "h-[36px] w-[36px] hover:bg-ddy-200 dark:hover:bg-ddy-800"


// 获取数据
export async function fetchData(url: any, timeout = 5000) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}
