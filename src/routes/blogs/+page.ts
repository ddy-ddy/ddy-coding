import type { PageLoad } from './$types';

const url_base = "http://121.4.85.24:1337";
const blog_url = url_base + "/api/blogs?fields=title&fields=summary&fields=publishedAt&populate=author&populate=blog_categories&populate=cover"


async function fetchData(url: any) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}


function processBlogData(blogData: any) {
    return blogData.map((blog: any) => {
        const categories = blog.attributes.blog_categories.data.map((category: any) => category.attributes.category_name);
        return {
            id: blog.id,
            title: blog.attributes.title,
            summary: blog.attributes.summary,
            publishTime: blog.attributes.publishedAt.split('T')[0],
            author: blog.attributes.author.data.attributes.name,
            coverUrl: url_base + blog.attributes.cover.data[0].attributes.formats.small.url,
            category: categories
        };
    });
}

export const load: PageLoad = async () => {
    try {
        // 获取所有博客信息
        const allBlogsResponse = await fetchData(blog_url);
        const allBlogs = processBlogData(allBlogsResponse.data);

        // 获取最近更新的5条博客信息
        const recentBlogsResponse = await fetchData(blog_url + '&sort=publishedAt:desc&pagination[limit]=5');
        const recentBlogs = processBlogData(recentBlogsResponse.data);

        // 获取每个类别下的博客信息
        const categoriesResponse = await fetchData(url_base + '/api/blog-categories');
        const categories = categoriesResponse.data.map((category: any) => { return { name: category.attributes.category_name } })
        const categoryBlogs = await Promise.all(categoriesResponse.data.map(async (category: any) => {
            const categoryBlogsResponse = await fetchData(blog_url + `&filters[blog_categories][id][$eq]=${category.id}`);
            const categoryBlogs = processBlogData(categoryBlogsResponse.data);
            return {
                name: category.attributes.category_name,
                blogs: categoryBlogs
            };
        }));
        // 返回组合数据
        return {
            allBlogs,
            recentBlogs,
            categoryBlogs,
            categories
        };
    } catch (error: any) {
        console.error('Error loading data:', error);
        // 可以返回一个错误信息或者空数据
        return {
            allBlogs: [],
            recentBlogs: [],
            categoryBlogs: [],
            categories: [],
            error: error.message
        };
    }
};


