export type Blog = {
    title: string;
    summary: string;
    publishedAt: string;
    author: {
        name: string;
    };
    cover: {
        url: string;
    };
    blog_categories: {
        data: []
    };
}
