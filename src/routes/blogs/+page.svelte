<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import * as Pagination from "$lib/components/ui/pagination";
  import type { PageData } from "./$types";
  import { urlListBlog, fetchData } from "$lib/config/site";
  import { blogPageSize, processListBlogData, processPaginationData } from "$lib/config/blogs";
  import { Skeleton } from "$lib/components/ui/skeleton";

  export let data: PageData;
  const fistBlogs: any = data.fistBlogs;
  const fistPaginationData: any = data.fistPaginationData;
  const fistSelectedCategory: any = data.fistSelectedCategory;
  const fistSelectedCategoryId: any = data.fistSelectedCategoryId;
  const allCategories: any = data.allCategories;

  // 展示博客相关变量
  $: showBlogs = fistBlogs;

  // 博客类别相关变量
  $: selectedCategory = fistSelectedCategory;
  $: selectedCategoryId = fistSelectedCategoryId;

  // 分页器相关变量
  $: pageCategoryChangeFlag = true;
  $: currentPage = fistPaginationData.currentPage;
  $: totalItems = fistPaginationData.totalItems;
  $: totalPages = fistPaginationData.totalPages;
  $: pageSize = fistPaginationData.pageSize;

  // 博客类别点击事件
  function handleCatgoryBlogClick(categoryName: string, categoryId: any) {
    selectedCategory = categoryName;
    selectedCategoryId = categoryId;
    loadCategoryBlogs(categoryId);
  }

  // 分页器点击事件
  function handlePageChange(pageValue: any) {
    currentPage = pageValue;
    loadPageBlogs(pageValue, selectedCategoryId);
  }

  // 分页器数据变化
  function changePageValue(paginationData: any) {
    pageCategoryChangeFlag = !pageCategoryChangeFlag;
    currentPage = paginationData.currentPage;
    totalItems = paginationData.totalItems;
    totalPages = paginationData.totalPages;
    pageSize = paginationData.pageSize;
    showBlogs = fistBlogs;
  }

  // 加载指定分页指定类别的博客数据
  async function loadPageBlogs(pageId: any, categoryId: any) {
    let pageBlogsResponse: any = null;
    if (categoryId == -1) {
      pageBlogsResponse = await fetchData(urlListBlog + `&pagination[page]=${pageId}&pagination[pageSize]=${blogPageSize}`);
    } else {
      pageBlogsResponse = await fetchData(urlListBlog + `&filters[blog_categories][id][$eq]=${categoryId}&pagination[page]=${pageId}&pagination[pageSize]=${blogPageSize}`);
    }
    const pageBlogs = processListBlogData(pageBlogsResponse.data);
    showBlogs = pageBlogs;
  }

  // 加载指定类别的博客数据
  async function loadCategoryBlogs(categoryId: any) {
    let categoryBlogsResponse: any = null;
    if (categoryId == -1) {
      categoryBlogsResponse = await fetchData(urlListBlog + `&pagination[page]=1&pagination[pageSize]=${blogPageSize}`);
    } else {
      categoryBlogsResponse = await fetchData(urlListBlog + `&filters[blog_categories][id][$eq]=${categoryId}&pagination[page]=1&pagination[pageSize]=${blogPageSize}`);
    }
    const categoryBlogs = processListBlogData(categoryBlogsResponse.data);
    const categoryPaginationData = processPaginationData(categoryBlogsResponse.meta.pagination);
    changePageValue(categoryPaginationData);
    showBlogs = categoryBlogs;
  }

</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10 flex flex-col gap-4">
  <!-- 博客分类展示 -->
  <Tabs.Root bind:value={selectedCategory} class="h-full">
    <Tabs.List class="flex flex-nowrap overflow-x-auto justify-start">
      <Tabs.Trigger value="所有博客" on:click={() => handleCatgoryBlogClick("所有博客", -1)}>所有博客</Tabs.Trigger>
      {#each allCategories as category}
        <Tabs.Trigger value={category.name} on:click={() => handleCatgoryBlogClick(category.name, category.id)}>{category.name}</Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each showBlogs as blog}
      <Tabs.Content bind:value={selectedCategory} class="py-4">
        <section class="flex flex-col space-y-4">
          <div class="flex space-x-4">
            <!-- <img alt="img" class="hidden md:block w-20 h-20 rounded-md border bg-muted object-cover" src={blog.coverUrl} /> -->
            <div class="flex flex-col space-y-1">
              <div class="flex-1 space-y-1">
                <a href={`/blogs/${blog.id}?category=${selectedCategoryId}&page=${currentPage}`} class="font-bold text-lg text-foreground/80 hover:text-ddy-400 dark:hover:text-ddy-600">{blog.title}</a>
                <p class="text-sm text-foreground/60 line-clamp-2">{blog.summary}</p>
              </div>
              <div class="flex space-x-2">
                <p class="tracking-tighter text-sm text-foreground/60">{blog.publishTime}</p>
                <Separator orientation="vertical" />
                {#each blog.category as category}
                  <span role="button" tabindex="0" on:click={() => handleCatgoryBlogClick(category.name, category.id)} class="text-sm text-foreground/60 hover:text-ddy-400 dark:hover:text-ddy-600 cursor-pointer">
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

  {#key pageCategoryChangeFlag}
    {#if totalPages > 1}
      <Pagination.Root count={totalItems} perPage={pageSize} let:pages class="text-foreground/80">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.PrevButton
              on:click={() => {
                handlePageChange((currentPage ?? 2) - 1);
              }}
            />
          </Pagination.Item>
          {#each pages as page (page.key)}
            {#if page.type == "ellipsis"}
              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
            {:else}
              <Pagination.Item>
                <Pagination.Link
                  {page}
                  isActive={currentPage == page.value}
                  on:click={() => {
                    handlePageChange(page.value);
                  }}
                >
                  {page.value}
                </Pagination.Link>
              </Pagination.Item>
            {/if}
          {/each}
          <Pagination.Item>
            <Pagination.NextButton
              on:click={() => {
                handlePageChange((currentPage ?? 0) + 1);
              }}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination.Root>
    {/if}
  {/key}
</div>
