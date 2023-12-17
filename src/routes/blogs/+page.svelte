<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { Card } from "./(components)";
  import type { PageData } from "./$types";
  export let data: PageData;
  const allBlogs: any = data.allBlogs;
  const recentBlogs: any = data.recentBlogs;
  const categoryBlogs: any = data.categoryBlogs;
  const categories: any = data.categories;

  let selectedCategory = "所有博客";
  $: filteredBlogs = selectedCategory === "所有博客" ? allBlogs : selectedCategory === "最新博客" ? recentBlogs : categoryBlogs.find((c: any) => c.name === selectedCategory)?.blogs || [];

  function selectCategory(event: any) {
    // 接受card.svelte传递过来的博客类名，从而动态更新Tabs.root的默认值，达到点击类别调整到对应页面的效果
    selectedCategory = event.detail;
  }
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <Tabs.Root bind:value={selectedCategory} class="h-full">
    <!-- tabs list -->
    <Tabs.List class="flex flex-nowrap overflow-x-auto justify-start bg-muted">
      <Tabs.Trigger value="所有博客">所有博客</Tabs.Trigger>
      <Tabs.Trigger value="最新博客">最新博客</Tabs.Trigger>
      {#each categories as category}
        <Tabs.Trigger value={category.name}>{category.name}</Tabs.Trigger>
      {/each}
    </Tabs.List>
    <!-- tabs content -->
    {#each filteredBlogs as blog}
      <Tabs.Content value={selectedCategory} class="py-2">
        <section class="flex flex-col space-y-6">
          <Card {blog} on:selectCategory={selectCategory} />
        </section>
      </Tabs.Content>
    {/each}
  </Tabs.Root>
</div>
