<script lang="ts">
  import type { PageData } from "./$types";
  import * as Avatar from "$lib/components/ui/avatar";
  import { marked } from "marked";
  export let data: PageData;
  const blog: any = data.blog;
  const htmlContent = marked(blog.content);
  function combineStyles(...styles: any) {
    return styles.join(" ");
  }
  const proseStyleBase = "prose prose-sm md:prose-base dark:prose-dark max-w-full";
  const proseStyleheadings = "prose-headings:text-foreground/80 prose-headings:tracking-[-0.015em] prose-h4:my-[10px] prose-h3:my-[20px] prose-h2:mb-[20px]";
  const proseStyleP = "prose-p:text-foreground/60 prose-p:my-[10px]";
  const proseStyleA = "prose-a:text-sky-400 hover:prose-a:text-sky-500 dark:prose-a:text-sky-500 dark:hover:prose-a:text-sky-400 prose-a:underline prose-a:underline-offset-4";
  const proseStylePre = "prose-pre:my-[1px] prose-pre:rounded-md";
  const proseStyleImg = "prose-img:my-[1px] prose-img:rounded-md";
  const proseStyle = combineStyles(proseStyleBase, proseStyleheadings, proseStyleP, proseStyleA, proseStylePre, proseStyleImg);
</script>

<div class="container max-w-3xl py-6 md:py-8 lg:py-10">
  <article class={proseStyle}>
    <div class="flex flex-col space-y-2">
      <div class="text-xs font-medium text-foreground/60">发布于 {blog.publishTime}</div>
      <div class="font-bold text-xl lg:text-3xl text-foreground/80">{blog.title}</div>
      <div class="not-prose flex space-x-4">
        <div class="flex items-center space-x-2 text-xs">
          <Avatar.Root>
            <Avatar.Image src={blog.authorIconLink} alt={blog.author} class="bg-slate-100" />
            <Avatar.Fallback>{blog.author}</Avatar.Fallback>
          </Avatar.Root>
          <div class="flex flex-col space-y-1/2 text-left">
            <div class="font-medium text-foreground/60">{blog.author}</div>
            <a href={blog.authorLink} class="text-sky-500 hover:text-sky-600 dark:text-sky-400">@ddy-ddy</a>
          </div>
        </div>
      </div>
    </div>
    {@html htmlContent}
  </article>
</div>
