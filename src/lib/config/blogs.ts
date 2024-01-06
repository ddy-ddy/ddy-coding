import { urlBase } from '$lib/config/site';

// 获取数据
export async function fetchData(url: any) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}

// 获取博客列表数据
export function processBlogData(blogData: any) {
    return blogData.map((blog: any) => {
        const categories = blog.attributes.blog_categories.data.map((category: any) => { return { id: category.id, name: category.attributes.category_name } });
        return {
            id: blog.id,
            title: blog.attributes.title,
            summary: blog.attributes.summary,
            publishTime: blog.attributes.publishedAt.split('T')[0],
            author: blog.attributes.author.data.attributes.name,
            coverUrl: urlBase + blog.attributes.cover.data[0].attributes.formats.small.url,
            category: categories
        };
    });
}
