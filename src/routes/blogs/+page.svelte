<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { Separator } from "$lib/components/ui/separator";
  import { Frame } from "radix-icons-svelte";
  let loop = [1, 2, 3, 4];
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <Tabs.Root value="所有博客" class="h-full">
    <Tabs.List class="flex flex-nowrap overflow-x-auto justify-start bg-muted">
      <Tabs.Trigger value="所有博客">所有博客</Tabs.Trigger>
      <Tabs.Trigger value="最新博客">最新博客</Tabs.Trigger>
      <Tabs.Trigger value="标签1">标签1</Tabs.Trigger>
      <Tabs.Trigger value="标签2">标签2</Tabs.Trigger>
      <Tabs.Trigger value="标签3">标签3</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="所有博客" class="py-2">
      <section class="flex flex-col space-y-6">
        {#each loop as lo}
          <div class="flex space-x-4">
            <img class="hidden md:block w-24 h-24 rounded-md border bg-muted" src="https://ddy-1310349779.cos.ap-shanghai.myqcloud.com/typora/%E7%BA%AF%E8%89%B2.png" />
            <div class="flex flex-col space-y-1">
              <div class="flex-1 space-y-1">
                <h2 class="text-xl font-extrabold line-clamp-1">如何通过ssh来构建服务器</h2>
                <p class="text-sm text-muted-foreground line-clamp-2">如何通过ssh来构建服务器,如何通过ssh来构建服,通过ssh来构建服务器,如何通过ssh来构建务器,,如何通过ssh来构建服务器,,如何通过ssh来构建服务器,,如何通过ssh来构建服务器,,如何通过ssh来构建服务器,,如何通过ssh来构建服务器,,如何通过ssh来构建服务器</p>
              </div>
              <div class="flex space-x-2">
                <p class="text-sm text-muted-foreground">2023-10-23</p>
                <Separator orientation="vertical" />
                <a href="/" class="text-sm text-muted-foreground hover:text-sky-400">建站</a>
                <Separator orientation="vertical" />
                <a href="/" class="text-sm text-muted-foreground hover:text-sky-400">生活</a>
                <Separator orientation="vertical" />
              </div>
            </div>
          </div>
          <Separator />
        {/each}
      </section>
    </Tabs.Content>
    <Tabs.Content value="最新博客">最新博客</Tabs.Content>
    <Tabs.Content value="标签1">#标签1</Tabs.Content>
    <Tabs.Content value="标签2">#标签2</Tabs.Content>
    <Tabs.Content value="标签3">#标签3</Tabs.Content>
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
