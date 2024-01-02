import type { Load } from '@sveltejs/kit';
import { url_base } from '$lib/config/site';


export const load: Load = async ({ params }) => {
    const { slug } = params;
    const blogData = await fetch(url_base + `/api/blogs/${slug}?populate=*`).then(res => res.json());

    const authorData = await fetch(url_base + `/api/authors/${blogData.data.attributes.author.data.id}?populate=*`).then(res => res.json());
    const authorIconLink = url_base + authorData.data.attributes.icon.data.attributes.url;

    const blog = {
        title: blogData.data.attributes.title,
        summary: blogData.data.attributes.summary,
        publishTime: blogData.data.attributes.publishedAt.split('T')[0],
        author: blogData.data.attributes.author.data.attributes.name,
        authorIconLink: authorIconLink,
        authorLink: blogData.data.attributes.author.data.attributes.github,
        authorMotto: blogData.data.attributes.author.data.attributes.motto,
        content: blogData.data.attributes.content,
        category: blogData.data.attributes.blog_categories.data[0].attributes.category_name,
    }

    if (blog) {
        return {
            blog
        };
    }

    throw new Error('Blog not found');
};
