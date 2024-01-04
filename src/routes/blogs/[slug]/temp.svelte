<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import { marked } from "marked";
  import { proseStyle } from "$lib/config/prose";
  import { logoRingStyle } from "$lib/config/site";

  export let data: PageData;
  const blog: any = data.blog;
  let htmlContent: any;
  let minLevel: number;
  let toc: any = [];

  onMount(() => {
    if (blog && blog.content) {
      htmlContent = marked(blog.content);
      parseContent();
    }
  });

  function parseContent() {
    toc = []; // 清空旧的目录
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    doc.querySelectorAll("h1:not(code h1), h2:not(code h2), h3:not(code h3)").forEach((element) => {
      const level: any = parseInt(element.tagName.substring(1));
      const text: any = element.textContent;
      toc.push({ level, text });
    });
    minLevel = Math.min(...toc.map((item: any) => item.level));
  }
</script>

<div class="overflow-hidden">
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- 返回按钮 -->
    <div class="hidden lg:block fixed z-20 top-12 left-[calc(10%)] w-[6rem] py-10">
      <div class="flex justify-end">
        <a role="button" href="/blogs" class="group flex leading-6 text-sm font-medium text-foreground/60 hover:text-foreground/80">
          <svg viewBox="0 -9 3 24" class="overflow-visible mr-2 w-auto h-6 text-foreground/60 group-hover:text-foreground/80">
            <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
          </svg>
          Go back
        </a>
      </div>
    </div>
    <!-- 博客内容 -->
    <div class="lg:ml-[calc(10%+6rem)]">
      <div class="max-w-3xl pt-10 lg:mx-10">
        <a role="button" href="/blogs" class="lg:hidden mb-6 group flex leading-6 text-sm font-medium text-foreground/60 hover:text-foreground/80">
          <svg viewBox="0 -9 3 24" class="overflow-visible mr-2 w-auto h-6 text-foreground/60 group-hover:text-foreground/80">
            <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
          </svg>
          Go back
        </a>
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
    </div>
    <!-- 博客目录 -->
    <div class="hidden lg:block fixed z-20 top-12 right-[calc(3%)] w-[16rem] py-10 overflow-y-auto">
      <ul>
        <div class="rounded-md border border-dashed p-2">
          <h3 class="font-bold text-lg mb-4 text-foreground/80 underline underline-offset-4 decoration-2 decoration-avocado-400 dark:decoration-avocado-600">目录</h3>
          {#each toc as item}
            <li class="mb-2">
              <a href="#{item.text}" class="truncate block tracking-tight py-1 sm:text-sm lg:text-md font-medium text-foreground/60 hover:text-foreground/80">
                {#if item.level - minLevel == 0}
                  {item.text}
                {:else}
                  • {item.text}
                {/if}
              </a>
            </li>
          {/each}
        </div>
      </ul>
    </div>
  </div>
</div>
