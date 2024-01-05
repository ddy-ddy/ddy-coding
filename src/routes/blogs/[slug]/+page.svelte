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

<section>
  <div class="flex flex-col lg:flex-row justify-center gap-4 max-w-7xl mx-auto py-4 lg:py-6">
    <!-- 正文 -->
    <div class="grow max-w-3xl mx-4 lg:mx-12 xl:mx-16">
      <div class="mb-4">
        <a role="button" href="/blogs" class="group flex leading-6 text-sm font-medium text-foreground/60 hover:text-foreground/80">
          <svg viewBox="0 -9 3 24" class="overflow-visible mr-2 w-auto h-6 text-foreground/60 group-hover:text-foreground/80">
            <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
          </svg>
          Go back
        </a>
      </div>
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
    <!-- 目录 -->
    <div class="hidden lg:block flex-none sticky top-20 z-10 max-h-[50vh] w-[calc(16vw)] 2xl:w-[calc(12vw)] ">
      <ul>
        <div class="rounded-md border border-dashed p-2">
          <h3 class="font-bold text-lg mb-4 text-foreground/80 underline underline-offset-4 decoration-2 decoration-avocado-400 dark:decoration-avocado-600">目录</h3>
          {#each toc as item}
            <li class="mb-2">
              <a href="#{item.text}" class="truncate block tracking-tight py-1 text-sm font-medium text-foreground/60 hover:text-foreground/80">
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
</section>
