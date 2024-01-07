import type { PageLoad } from './$types';
import { urlListBlog, urlBase } from '$lib/config/site';
import { fetchData, processCategoriesData, processListBlogData } from '$lib/config/blogs';


export const load: PageLoad = async ({ fetch, params }) => {
    try {
        const urlFristListBlog = urlListBlog + '&pagination[page]=1&pagination[pageSize]=5'

        const allBlogsResponse = await fetchData(urlFristListBlog);
        const allBlogs: any = processListBlogData(allBlogsResponse.data);

        const categoriesResponse = await fetchData(urlBase + '/api/blog-categories');
        const categories = processCategoriesData(categoriesResponse.data);
        return {
            allBlogs,
            categories
        };
    } catch (error: any) {
        return {
            allBlogs: [],
            categories: [],
            error: error.message
        };
    }
};


