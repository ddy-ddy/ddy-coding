<script lang="ts">
  import type { PageData } from "./$types";
  import { Separator } from "$lib/components/ui/separator";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Image, Map } from "./(components)";
  import { imageLists } from "./(data)/images";

  export let data: PageData;
  let pictures: any = data.pictures;
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10 flex flex-col gap-4">
  <div class="h-full mx-auto py-6">
    <Tabs.Root value="music" class="h-full space-y-6">
      <Tabs.List>
        <Tabs.Trigger value="music" class="relative">图片</Tabs.Trigger>
        <Tabs.Trigger value="podcasts">地图</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="music" class="border-none p-0 outline-none">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold tracking-tight">旅游</h2>
            <p class="text-sm text-muted-foreground">旅游中的风景值得记忆</p>
          </div>
        </div>
        <Separator class="my-4" />
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {#each pictures as picture}
            <div class="space-y-3 lg:pr-4 py-2">
              <div class="overflow-hidden rounded-md">
                <img class="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" src={picture.large_url} alt={picture.description} />
              </div>
            </div>
          {/each}
        </div>
      </Tabs.Content>
      <Tabs.Content value="podcasts" class="h-full flex-col border-none p-0 data-[state=active]:flex">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold tracking-tight">旅游</h2>
            <p class="text-sm text-muted-foreground">旅游中的风景值得记忆</p>
          </div>
        </div>
        <Separator class="my-4" />
        <Map />
      </Tabs.Content>
    </Tabs.Root>
  </div>
</div>
