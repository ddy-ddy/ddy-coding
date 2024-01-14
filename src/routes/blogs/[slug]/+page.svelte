<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import { proseStyle } from "$lib/config/prose";
  import { logoRingStyle } from "$lib/config/site";
  import { ArrowLeft } from "lucide-svelte";
  import { Icons } from "$lib/components/icons";

  export let data: PageData;
  let blog: any = data.blog;
  let htmlContent: any = data.blog.content;
  let minLevel: any = data.blog.minLevel;
  let toc: any = data.blog.toc;
  let activeId: any = null;
  let clickCategory = $page.url.searchParams.get("category");
  let clickPage = $page.url.searchParams.get("page");

  onMount(() => {
    if (htmlContent) {
      window.addEventListener("scroll", updateActiveTocItem);
    }
    return () => {
      // 在组件卸载时移除监听器
      window.removeEventListener("scroll", updateActiveTocItem);
    };
  });

  // 更新当前激活的目录项
  function updateActiveTocItem() {
    let closestId = null;
    let closestDistance = Infinity;

    toc.forEach((item: any) => {
      const element: any = document.getElementById(item.id);
      const distance = Math.abs(element.getBoundingClientRect().top);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = item.id;
      }
    });
    activeId = closestId;
  }
</script>

<section>
  <div class="flex flex-col lg:flex-row justify-center gap-4 max-w-7xl mx-auto py-4 lg:py-6">
    <!-- 正文 -->
    <div class="grow max-w-3xl mx-4 lg:mx-12 xl:mx-16">
      <div class="mb-4">
        <a role="button" href={`/blogs?category=${clickCategory}&page=${clickPage}`} class="group flex items-center leading-6 text-sm font-medium text-foreground/60 hover:text-foreground/80">
          <ArrowLeft class="mb-[1px] mr-1 w-4 h-4 text-foreground/60 group-hover:text-foreground/80"></ArrowLeft>
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
                  <Icons.logo class="ml-[1px] hover:animate-move-right-left" />
                </Avatar.Root>
                <!-- <Avatar.Root class={logoRingStyle}>
                  <Avatar.Image src={blog.authorIconLink} alt={blog.author} class="ml-[1px]" />
                  <Avatar.Fallback>{blog.author}</Avatar.Fallback>
                </Avatar.Root> -->
              </a>
              <div class="flex flex-col space-y-[2px] text-left">
                <div class="font-medium text-foreground/80">{blog.author}</div>
                <div class="text-xs text-foreground/60">{blog.authorMotto}</div>
              </div>
            </div>
          </div>
        </div>
        <article>
          {@html htmlContent}
        </article>
      </article>
    </div>
    <!-- 目录 -->
    <div class="hidden lg:block flex-none sticky top-20 z-10 max-h-[50vh] w-[calc(16vw)] 2xl:w-[calc(12vw)]">
      <ul>
        <div class="rounded-md p-2">
          <h3 class="font-bold text-lg mb-4 text-foreground/80 underline underline-offset-4 decoration-2 decoration-ddy-400 dark:decoration-ddy-600">目录</h3>
          {#each toc as item}
            <li class="py-[6px]">
              <a href="#{item.id}" class="truncate block tracking-tight text-sm font-medium border-l-[1.5px] pl-2 {item.id === activeId ? 'pl-4 text-ddy-400 dark:text-ddy-600 border-ddy-400 dark:border-ddy-600' : 'text-foreground/60 hover:text-foreground/80'}">
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
