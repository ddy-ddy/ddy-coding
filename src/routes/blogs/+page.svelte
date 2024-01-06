<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import * as Pagination from "$lib/components/ui/pagination";
  import type { PageData } from "./$types";

  export let data: PageData;
  const allBlogs: any = data.allBlogs;
  const recentBlogs: any = data.recentBlogs;
  const categories: any = data.categories;
  let count = 100;
  let perPage = 10;

  $: selectedCategory = "所有博客";
  $: ShowBlogs = allBlogs;

  function handleCatgoryBlogClick(categoryName: string) {
    selectedCategory = categoryName;
    if (selectedCategory === "所有博客") {
      ShowBlogs = allBlogs;
    } else if (selectedCategory === "最新博客") {
      ShowBlogs = recentBlogs;
    } else {
      loadCategoryBlogs(selectedCategory);
    }
  }

  async function loadCategoryBlogs(categoryName: string) {
    let tempCategoryBlogs = allBlogs.filter((c: any) => c.category.includes(categoryName));
    ShowBlogs = tempCategoryBlogs;
  }
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <Tabs.Root bind:value={selectedCategory} class="h-full">
    <!-- tabs list -->
    <Tabs.List class="flex flex-nowrap overflow-x-auto justify-start">
      <Tabs.Trigger value="所有博客" on:click={() => handleCatgoryBlogClick("所有博客")}>所有博客</Tabs.Trigger>
      <Tabs.Trigger value="最新博客" on:click={() => handleCatgoryBlogClick("最新博客")}>最新博客</Tabs.Trigger>
      {#each categories as category}
        <Tabs.Trigger value={category.name} on:click={() => handleCatgoryBlogClick(category.name)}>{category.name}</Tabs.Trigger>
      {/each}
    </Tabs.List>
    <!-- tabs content -->
    {#each ShowBlogs as blog}
      <Tabs.Content bind:value={selectedCategory} class="py-2">
        <section class="flex flex-col space-y-6">
          <div class="flex space-x-4">
            <img alt="img" class="hidden md:block w-24 h-24 rounded-md border bg-muted" src={blog.coverUrl} />
            <div class="flex flex-col space-y-1">
              <div class="flex-1 space-y-1">
                <a href={`/blogs/${blog.id}`} class="font-bold text-base md:text-lg lg:text-xl text-foreground/80">{blog.title}</a>
                <p class="text-sm text-foreground/60 line-clamp-2">{blog.summary}</p>
              </div>
              <div class="flex space-x-2">
                <p class="text-sm text-foreground/60">{blog.publishTime}</p>
                <Separator orientation="vertical" />
                {#each blog.category as categoryName}
                  <span role="button" tabindex="0" on:click={() => handleCatgoryBlogClick(categoryName)} class="text-sm text-foreground/60 hover:text-foreground/80 cursor-pointer">
                    {categoryName}
                  </span>
                  <Separator orientation="vertical" />
                {/each}
              </div>
            </div>
          </div>
          <Separator />
        </section>
      </Tabs.Content>
    {/each}
  </Tabs.Root>
</div>



<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
