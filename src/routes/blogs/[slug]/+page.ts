import type { Load } from '@sveltejs/kit';

const url_base = "http://121.4.85.24:1337";

export const load: Load = async ({ params }) => {
    const { slug } = params;
    const blogData = await fetch(url_base + `/api/blogs/${slug}?populate=*`).then(res => res.json());
    const contentFileUrl = url_base + blogData.data.attributes.content_file.data[0].attributes.url;
    const markdownResponse = await fetch(contentFileUrl);
    const markdownContent = await markdownResponse.text();

    const blog = {
        title: blogData.data.attributes.title,
        summary: blogData.data.attributes.summary,
        publishTime: blogData.data.attributes.publishedAt.split('T')[0],
        author: blogData.data.attributes.author.data.attributes.name,
        authorLink: blogData.data.attributes.author.data.attributes.github,
        content: markdownContent
    }

    if (blog) {
        return {
            blog
        };
    }

    throw new Error('Blog not found');
};
