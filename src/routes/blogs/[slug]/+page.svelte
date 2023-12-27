<script lang="ts">
  import type { PageData } from "./$types";
  import * as Avatar from "$lib/components/ui/avatar";
  import { marked } from "marked";
  import { proseStyle } from "$lib/config/prose";
  import { logoRingStyle } from "$lib/config/site";
  export let data: PageData;
  const blog: any = data.blog;
  const htmlContent = marked(blog.content);
</script>

<div class="container max-w-3xl py-6 md:py-8 lg:py-10">
  <article class={proseStyle}>
    <div class="flex flex-col space-y-2">
      <div class="text-xs text-foreground/60">发布于 {blog.publishTime}</div>
      <h2>{blog.title}</h2>
      <div class="not-prose flex space-x-4">
        <div class="flex items-center space-x-2 text-xs">
          <a href={blog.authorLink} target="_blank" rel="logo">
            <Avatar.Root class={logoRingStyle}>
              <Avatar.Image src={blog.authorIconLink} alt={blog.author} class="ml-[1px]" />
              <Avatar.Fallback>{blog.author}</Avatar.Fallback>
            </Avatar.Root>
          </a>
          <div class="flex flex-col space-y-[2px] text-left">
            <div class="font-medium text-foreground/80">{blog.author}</div>
            <div class="text-xs text-foreground/60">{blog.authorMotto}</div>
          </div>
        </div>
      </div>
    </div>
    {@html htmlContent}
  </article>
</div>
