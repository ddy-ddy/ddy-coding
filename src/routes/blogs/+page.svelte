<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import * as Pagination from "$lib/components/ui/pagination";
  import type { PageData } from "./$types";
  import { allBlogUrl } from "$lib/config/site";
  import { fetchData, processBlogData } from "$lib/config/blogs";

  export let data: PageData;
  const allBlogs: any = data.allBlogs;
  const categories: any = data.categories;

  $: selectedCategory = "所有博客";
  $: ShowBlogs = allBlogs;

  function handleCatgoryBlogClick(categoryName: string, categoryId: any) {
    selectedCategory = categoryName;
    if (selectedCategory === "所有博客") {
      ShowBlogs = allBlogs;
    } else {
      loadCategoryBlogs(categoryId);
    }
  }

  async function loadCategoryBlogs(categoryId: any) {
    const categoryBlogsResponse = await fetchData(allBlogUrl + `&filters[blog_categories][id][$eq]=${categoryId}`);
    const categoryBlogs = processBlogData(categoryBlogsResponse.data);
    ShowBlogs = categoryBlogs;
  }
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10 flex flex-col gap-4">
  <!-- 博客分类展示 -->
  <Tabs.Root bind:value={selectedCategory} class="h-full">
    <!-- tabs list -->
    <Tabs.List class="flex flex-nowrap overflow-x-auto justify-start">
      <Tabs.Trigger value="所有博客" on:click={() => handleCatgoryBlogClick("所有博客", -1)}>所有博客</Tabs.Trigger>
      {#each categories as category}
        <Tabs.Trigger value={category.name} on:click={() => handleCatgoryBlogClick(category.name, category.id)}>{category.name}</Tabs.Trigger>
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
                {#each blog.category as category}
                  <span role="button" tabindex="0" on:click={() => handleCatgoryBlogClick(category.name, category.id)} class="text-sm text-foreground/60 hover:text-foreground/80 cursor-pointer">
                    {category.name}
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
  <!-- 分页器 -->
  <Pagination.Root count={7} perPage={5} let:pages let:currentPage>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage == page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
