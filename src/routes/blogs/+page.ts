import type { PageLoad } from './$types';
import { url_base } from '$lib/config/site';
import { fetchData, processBlogData, getRecentBlogs } from '$lib/config/blogs';

const blog_url = url_base + "/api/blogs?fields=title&fields=summary&fields=publishedAt&populate=author&populate=blog_categories&populate=cover"


export const load: PageLoad = async () => {
    try {
        const allBlogsResponse = await fetchData(blog_url);
        const allBlogs = processBlogData(allBlogsResponse.data);
        const recentBlogs = getRecentBlogs(allBlogs);

        const categoriesResponse = await fetchData(url_base + '/api/blog-categories');
        const categories = categoriesResponse.data.map((category: any) => { return { name: category.attributes.category_name } })

        return {
            allBlogs,
            recentBlogs,
            categories,
            categoryBlogs: []
        };
    } catch (error: any) {
        console.error('Error loading data:', error);
        return {
            allBlogs: [],
            recentBlogs: [],
            categories: [],
            error: error.message
        };
    }
};


