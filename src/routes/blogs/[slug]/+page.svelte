<script lang="ts">
  import type { PageData } from "./$types";
  import * as Avatar from "$lib/components/ui/avatar";
  import { marked } from "marked";
  export let data: PageData;
  const blog: any = data.blog;
  const htmlContent = marked(blog.content);
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <article class="prose prose-sm md:prose-base dark:prose-dark mx-auto">
    <div class="flex flex-col space-y-2">
      <div class="text-xs font-medium text-muted-foreground">发布于 {blog.publishTime}</div>
      <div class="font-bold text-xl lg:text-3xl text-primary">{blog.title}</div>
      <div class="not-prose flex space-x-4">
        <div class="flex items-center space-x-2 text-xs">
          <Avatar.Root>
            <Avatar.Image src={blog.authorIconLink} alt={blog.author} class="bg-slate-100" />
            <Avatar.Fallback>{blog.author}</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-col space-y-1/2 text-left">
            <div class="font-medium text-muted-foreground">{blog.author}</div>
            <a href={blog.authorLink} class="text-sky-500 hover:text-sky-600 dark:text-sky-400">@ddy-ddy</a>
          </div>
        </div>
      </div>
    </div>
    {@html htmlContent}
  </article>
</div>
