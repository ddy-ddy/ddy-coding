import type { PageLoad } from './$types';
import type { Blog } from "$lib/types/blogs";
const url_base = "http://121.4.85.24:1337"
export const load: PageLoad = async () => {
    const response = await fetch(url_base + '/api/blogs?populate=*');
    if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.statusText}`);
    }
    const blogsData = await response.json();

    const blogs: { blog: Blog[] } = blogsData.data.map((blog: any) => {
        const categories = blog.attributes.blog_categories.data.map((category: any) => category.attributes.category_name);

        return {
            title: blog.attributes.title,
            summary: blog.attributes.summary,
            publishTime: blog.attributes.publishedAt.split('T')[0],
            author: blog.attributes.author.data.attributes.name,
            coverUrl: url_base + blog.attributes.cover.data[0].attributes.url,
            category: categories
        };
    });
    return {
        blogs: blogs
    }
}