<script lang="ts">
  import { PlusCircled } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Image, Sidebar, Map } from "./(components)";
  import { imageLists } from "./(data)/images";
</script>

<div class="block border-t bg-background">
  <div class="grid md:grid-cols-5 lg:grid-cols-8">
    <Sidebar class="hidden md:block md:col-span-1 lg:col-span-1" />
    <div class="md:col-span-4 lg:col-span-7 md:border-l">
      <div class="h-full px-4 py-6 lg:px-8">
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
              {#each imageLists as image}
                <Image {image} class="lg:pr-4 py-2" aspectRatio="portrait" />
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
  </div>
</div>
