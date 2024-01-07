import type { PageLoad } from './$types';
import { urlListBlog, urlBase } from '$lib/config/site';
import { blogPageSize,fetchData, processCategoriesData, processListBlogData, processPaginationData } from '$lib/config/blogs';


export const load: PageLoad = async ({ fetch, params }) => {
    try {
        const urlFristListBlog = urlListBlog + `&pagination[page]=1&pagination[pageSize]=${blogPageSize}`

        const allBlogsResponse = await fetchData(urlFristListBlog);
        const allBlogs: any = processListBlogData(allBlogsResponse.data);
        const paginationData = processPaginationData(allBlogsResponse.meta.pagination);

        const categoriesResponse = await fetchData(urlBase + '/api/blog-categories');
        const categories = processCategoriesData(categoriesResponse.data);
        return {
            allBlogs,
            paginationData,
            categories
        };
    } catch (error: any) {
        return {
            allBlogs: [],
            paginationData: [],
            categories: [],
            error: error.message
        };
    }
};


