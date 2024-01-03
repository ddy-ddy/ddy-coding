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

<div class="flex flex-col lg:flex-row justify-center lg:items-stretch gap-4 max-w-7xl mx-auto py-6 md:py-8 lg:py-10">
  <div class="max-w-2xl mx-4 md:mx-0">
    <a role="button" href="/blogs" class="group flex leading-6 text-sm font-medium text-foreground/60 hover:text-foreground/80">
      <svg viewBox="0 -9 3 24" class="overflow-visible mr-2 w-auto h-6 text-foreground/60 group-hover:text-foreground/80">
        <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
      </svg>
      Go back
    </a>
  </div>
  <div class="max-w-3xl mx-4 md:mx-8 lg:mx-12">
    <article class={proseStyle}>
      <div class="flex flex-col space-y-2">
        <div class="text-xs text-foreground/60">发布于 {blog.publishTime}</div>
        <h1>{blog.title}</h1>
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
  <div class="max-w-2xl hidden lg:block bg-avocado-300">{@html blog.toc}</div>
</div>
