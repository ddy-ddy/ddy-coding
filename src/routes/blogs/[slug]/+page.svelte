<script lang="ts">
  import type { PageData } from "./$types";
  import { marked } from "marked";
  export let data: PageData;
  const blog: any = data.blog;
  const htmlContent = marked(blog.content);
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <article class="prose prose-sm md:prose-lg dark:prose-invert mx-auto">
    <div>
      <time class="block text-sm text-muted-foreground">发布于 {blog.publishTime}</time>
      <h1 class="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">{blog.title}</h1>
      <div class="mt-4 flex space-x-4">
        <a class="flex items-center space-x-2 text-sm" href={blog.authorLink}>
          <img src={blog.authorIconLink} alt={blog.author} loading="lazy" class="w-12 h-12 rounded-full bg-white" />
          <div class="flex-1 text-left leading-tight">
            <p class="font-medium">{blog.author}</p>
            <p class="text-[12px] text-muted-foreground">@{blog.author}</p>
          </div>
        </a>
      </div>
    </div>
    {@html htmlContent}
  </article>
</div>
