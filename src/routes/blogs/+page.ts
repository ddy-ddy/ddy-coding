import type { PageLoad } from './$types';
import { urlListBlog, urlBase, fetchData } from '$lib/config/site';
import { blogPageSize, processCategoriesData, processListBlogData, processPaginationData } from '$lib/config/blogs';


export const load: PageLoad = async ({ url }) => {
    try {
        const queryParams = new URLSearchParams(url.search);
        const clickCategory: any = queryParams.get('category');
        let clickPage: any = queryParams.get('page');
        let urlFristListBlog = null;
        let fistSelectedCategory = null;
        let fistSelectedCategoryId = null;

        if (clickPage >= 1) {
            clickPage = clickPage;
        } else {
            clickPage = 1;
        }

        if (clickCategory == -1 || clickCategory == null) {
            urlFristListBlog = urlListBlog + `&pagination[page]=${clickPage}&pagination[pageSize]=${blogPageSize}`;
        } else {
            urlFristListBlog = urlListBlog + `&filters[blog_categories][id][$eq]=${clickCategory}&pagination[page]=${clickPage}&pagination[pageSize]=${blogPageSize}`
        }

        const fistBlogsResponse = await fetchData(urlFristListBlog);
        const fistBlogs: any = processListBlogData(fistBlogsResponse.data);
        const fistPaginationData = processPaginationData(fistBlogsResponse.meta.pagination);

        const categoriesResponse = await fetchData(urlBase + '/api/blog-categories');
        const allCategories = processCategoriesData(categoriesResponse.data);

        if (clickCategory == -1 || clickCategory == null) {
            fistSelectedCategory = "所有博客";
            fistSelectedCategoryId = -1;
        } else {
            fistSelectedCategory = allCategories.find((category: any) => category.id == clickCategory).name;
            fistSelectedCategoryId = clickCategory;
        }

        return {
            fistBlogs,
            fistPaginationData,
            allCategories,
            fistSelectedCategory,
            fistSelectedCategoryId
        };
    } catch (error: any) {
        return {
            error: error.message
        };
    }
};


