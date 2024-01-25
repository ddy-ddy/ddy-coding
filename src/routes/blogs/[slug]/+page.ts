import type { PageLoad } from './$types';
import { Parser } from 'htmlparser2';
import { urlBase } from '$lib/config/site';
import { marked } from "marked";

// 处理目录
function parseContent(htmlContent: any) {
    let toc: any = [];
    let minLevel = 1;
    let modifiedHtml = "";
    let currentIndex = 0;

    const selfClosingTags = ["img", "br", "hr", "input", "link", "meta"]; // 自闭合标签列表

    const parser = new Parser({
        onopentag(name, attributes) {
            if (name === "h1" || name === "h2") {
                const anchorId = `content-${currentIndex++}`;
                minLevel = Math.max(minLevel, name === "h1" ? 1 : 2);
                toc.push({
                    level: name === "h1" ? 1 : 2,
                    id: anchorId,
                    text: "",
                });
                toc[toc.length - 1].id = anchorId;
                // 添加带有 id 的新标签到 modifiedHtml
                modifiedHtml += `<${name} id="${anchorId}">`;
            } else {
                // 构建带有属性的标签开始部分
                modifiedHtml += `<${name}`;
                for (let attr in attributes) {
                    modifiedHtml += ` ${attr}="${attributes[attr]}"`;
                }
                // 检查是否是自闭合标签
                if (selfClosingTags.includes(name)) {
                    modifiedHtml += " />";
                } else {
                    modifiedHtml += ">";
                }
            }
        },
        ontext(text) {
            if (toc.length > 0 && (toc[toc.length - 1].text === "")) {
                toc[toc.length - 1].text = text;
            }
            modifiedHtml += text;
        },
        onclosetag(tagname) {
            // 为非自闭合标签添加结束标签
            if (!selfClosingTags.includes(tagname)) {
                modifiedHtml += `</${tagname}>`;
            }
        }
    }, { decodeEntities: true });

    parser.write(htmlContent);
    parser.end();

    return { toc, minLevel, modifiedHtml };
}


export const load: PageLoad = async ({ fetch, params }) => {
    const { slug } = params;
    const blogData = await fetch(urlBase + `/api/blogs/${slug}?populate=*`).then(res => res.json());

    const authorData = await fetch(urlBase + `/api/authors/${blogData.data.attributes.author.data.id}?populate=*`).then(res => res.json());
    const authorIconLink = urlBase + authorData.data.attributes.icon.data.attributes.url;

    const htmlContent = marked(blogData.data.attributes.content);
    const { toc, minLevel, modifiedHtml } = parseContent(htmlContent);

    const blog = {
        title: blogData.data.attributes.title,
        viewCount: blogData.data.attributes.viewCount,
        summary: blogData.data.attributes.summary,
        publishTime: blogData.data.attributes.publishedAt.split('T')[0],
        author: blogData.data.attributes.author.data.attributes.name,
        authorIconLink: authorIconLink,
        authorLink: blogData.data.attributes.author.data.attributes.github,
        authorMotto: blogData.data.attributes.author.data.attributes.motto,
        content: modifiedHtml,
        toc: toc,
        minLevel: minLevel,
    }

    if (blog) {
        return {
            blog
        };
    }

    throw new Error('Blog not found');
};
