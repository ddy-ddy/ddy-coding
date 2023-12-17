<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import { Card } from "./(components)";
  import type { PageData } from "./$types";
  export let data: PageData;
  const allBlogs: any = data.allBlogs;
  const recentBlogs: any = data.recentBlogs;
  const categoryBlogs: any = data.categoryBlogs;
  const categories: any = data.categories;
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <Tabs.Root value="所有博客" class="h-full">
    <Tabs.List class="flex flex-nowrap overflow-x-auto justify-start bg-muted">
      <Tabs.Trigger value="所有博客">所有博客</Tabs.Trigger>
      <Tabs.Trigger value="最新博客">最新博客</Tabs.Trigger>
      {#each categories as category}
        <Tabs.Trigger value={category.name}>{category.name}</Tabs.Trigger>
      {/each}
    </Tabs.List>
    <Tabs.Content value="所有博客" class="py-2">
      <section class="flex flex-col space-y-6">
        {#each allBlogs as blog}
          <Card {blog} />
        {/each}
      </section>
    </Tabs.Content>
    <Tabs.Content value="最新博客" class="py-2">
      <section class="flex flex-col space-y-6">
        {#each recentBlogs as blog}
          <Card {blog} />
        {/each}
      </section>
    </Tabs.Content>
    {#each categoryBlogs as blogs}
      <Tabs.Content value={blogs.name} class="py-2">
        <section class="flex flex-col space-y-6">
          {#each blogs.blogs as blog}
            <Card {blog} />
          {/each}
        </section>
      </Tabs.Content>
    {/each}
  </Tabs.Root>
</div>
