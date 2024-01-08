import { urlBase } from '$lib/config/site';

export const blogPageSize = 2;

// 获取数据
export async function fetchData(url: any) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}

// 处理博客类别数据
export function processCategoriesData(categoriesData: any) {
    return categoriesData.map((category: any) => { return { id: category.id, name: category.attributes.category_name } });
}

// 处理博客列表展示数据
export function processListBlogData(blogData: any) {
    return blogData.map((blog: any) => {
        const categories = processCategoriesData(blog.attributes.blog_categories.data);
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


// 处理博客列表分页数据
export function processPaginationData(paginationData: any) {
    return {
        currentPage: paginationData.page,
        totalPages: paginationData.pageCount,
        pageSize: paginationData.pageSize,
        totalItems: paginationData.total
    };
}