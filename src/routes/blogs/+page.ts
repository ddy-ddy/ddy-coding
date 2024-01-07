import type { PageLoad } from './$types';
import { allBlogUrl, urlBase } from '$lib/config/site';
import { fetchData, processBlogData } from '$lib/config/blogs';


export const load: PageLoad = async ({ fetch, params }) => {
    try {
        const allBlogsResponse = await fetchData(allBlogUrl);
        const allBlogs: any = processBlogData(allBlogsResponse.data);

        const categoriesResponse = await fetchData(urlBase + '/api/blog-categories');
        const categories = categoriesResponse.data.map((category: any) => { return { id: category.id, name: category.attributes.category_name } })

        return {
            allBlogs,
            categories,
            categoryBlogs: []
        };
    } catch (error: any) {
        console.error('Error loading data:', error);
        return {
            allBlogs: [],
            categories: [],
            error: error.message
        };
    }
};


