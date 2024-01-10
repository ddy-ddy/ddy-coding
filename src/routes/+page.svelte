<script lang="ts">
  import type { PageData } from "./$types";
  import { proseStyle } from "$lib/config/prose";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Separator } from "$lib/components/ui/separator";
  import { Icons } from "$lib/components/icons";
  import { Users, MapPinned, BadgeCheck, Camera, Bike, PiggyBank,Hash } from "lucide-svelte";
  import { siteConfig } from "$lib/config/site";

  export let data: PageData;
  let authorInfo: any = data.authrorInfo;
  let htmlProfile: any = authorInfo.authorProfile;
</script>

<section class="container py-6 md:py-8 lg:py-10">
  <div class="grid gap-4 lg:grid-cols-7">
    <!-- 展示 -->
    <div class="rounded-xl border bg-card text-card-foreground shadow lg:col-span-2 p-8">
      <div class="flex flex-col justify-center space-y-4">
        <!-- 内容1 -->
        <Avatar.Root class="h-32 w-32 lg:h-48 lg:w-48 bg-avocado-200 dark:bg-avocado-600 self-center">
          <Icons.logo class="ml-[1px]" />
        </Avatar.Root>
        <Separator />
        <!-- 内容2 -->
        <div class="flex flex-col space-y-[2px] text-left">
          <div class="font-bold text-lg text-foreground/80">{authorInfo.author}</div>
          <div class="text-xs text-foreground/60">{authorInfo.authorMotto}</div>
        </div>
        <div class="flex space-x-2">
          <a class="group flex space-x-1 items-end" href="https://github.com/ddy-ddy?tab=followers">
            <Users class="h-4 w-4 group-hover:text-avocado-400 dark:group-hover:text-avocado-600"></Users>
            <div class="-mb-[1px] text-xs font-medium text-foreground/80 group-hover:text-avocado-400 dark:group-hover:text-avocado-600">156 followers</div>
          </a>
          <Separator orientation="vertical" />
          <div class="flex space-x-1 items-end">
            <MapPinned class="h-4 w-4"></MapPinned>
            <div class="-mb-[1px] text-xs font-medium text-foreground/80">Guan Zhou</div>
          </div>
        </div>
        <Separator />
        <!-- 内容3 -->
        <div class="font-bold text-base text-foreground/80">Coding </div>
        <div class="flex-grow">
          <div class="flex flex-wrap gap-x-3 gap-y-3">
            {#each siteConfig.codingInfo as codingInfo}
              <div class="flex items-center space-x-1">
                <BadgeCheck class="h-4 w-4 {codingInfo.color}" />
                <p class="text-xs font-medium text-foreground/80">{codingInfo.name}</p>
              </div>
            {/each}
          </div>
        </div>
        <Separator />
        <!-- 内容4 -->
        <div class="font-bold text-base text-foreground/80">Life</div>
        <div class="flex-grow">
          <div class="flex flex-wrap gap-x-3 gap-y-3">
            <a href="/pictures" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-avocado-400 dark:shadow-avocado-800 p-1">
              <Camera class="group-hover:animate-move-right-left h-4 w-4 fill-avocado-200 dark:fill-avocado-600"></Camera>
              <p class="text-xs font-medium text-foreground/80">摄影</p>
            </a>
            <a href="https://www.strava.com/athletes/duanyu" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-orange-400 dark:shadow-orange-800 p-1">
              <Bike class="group-hover:animate-move-right-left h-4 w-4 fill-orange-200 dark:fill-orange-600"></Bike>
              <p class="text-xs font-medium text-foreground/80">骑行</p>
            </a>
            <a href="https://space.bilibili.com/434180761" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-pink-400 dark:shadow-pink-800 p-1">
              <PiggyBank class="group-hover:animate-move-right-left h-4 w-4 fill-pink-200 dark:fill-pink-600"></PiggyBank>
              <p class="text-xs font-medium text-foreground/80">UP主</p>
            </a>
          </div>
        </div>
        <Separator />
        <!-- 内容5 -->
        <div class="font-bold text-base text-foreground/80">Social</div>
      </div>
    </div>
    <div class="rounded-xl border bg-card text-card-foreground shadow lg:col-span-5 p-8">
      <article class={proseStyle}>
        {@html htmlProfile}
      </article>
    </div>
  </div>
</section>
