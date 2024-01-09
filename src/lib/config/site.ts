export const urlBase = "https://strapi.ddycoding.cn";
export const urlListBlog = urlBase + "/api/blogs?fields=title&fields=summary&fields=publishedAt&populate=author&populate=blog_categories&populate=cover&sort=publishedAt:desc"


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
        { "name": "项目", "path": "/projects" },
        { "name": "博客", "path": "/blogs" },
        { "name": "照片", "path": "/pictures" },
    ]
}
export const logoRingStyle = "h-[36px] w-[36px] hover:origin-center hover:rotate-45 hover:bg-avocado-200 dark:hover:bg-avocado-800"


// 获取数据
export async function fetchData(url: any) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}
