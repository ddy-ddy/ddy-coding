<script lang="ts">
  import type { PageData } from "./$types";
  import { proseStyle } from "$lib/config/prose";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Separator } from "$lib/components/ui/separator";
  import { Icons } from "$lib/components/icons";
  import { Users, MapPinned, BadgeCheck, Camera, Bike, PiggyBank, Album } from "lucide-svelte";
  import { siteConfig } from "$lib/config/site";
  import * as Drawer from "$lib/components/ui/drawer";

  export let data: PageData;
  let authorInfo: any = data.authorInfo;
  let githubInfo: any = data.githubInfo;
  let htmlProfile: any = authorInfo.authorProfile;
</script>

<section class="container py-6 md:py-8 lg:py-10 max-w-6xl">
  <div class="grid gap-4 lg:grid-cols-7">
    <!-- 展示 -->
    <div class="rounded-xl shadow border bg-card text-card-foreground lg:col-span-2 p-8">
      <div class="flex flex-col justify-center space-y-4">
        <!-- 内容1:logo -->
        <Avatar.Root class="h-32 w-32 lg:h-48 lg:w-48 bg-avocado-200 dark:bg-avocado-600 self-center">
          <Icons.logo class="ml-[1px] hover:animate-move-right-left" />
        </Avatar.Root>
        <Separator />
        <!-- 内容2:名称 -->
        <div class="flex flex-col space-y-[2px] text-left">
          <div class="font-bold text-lg text-foreground/80">{authorInfo.author}</div>
          <div class="text-xs text-foreground/60">{authorInfo.authorMotto}</div>
        </div>
        <div class="flex space-x-2">
          <a class="group flex space-x-1 items-end" href="https://github.com/ddy-ddy?tab=followers">
            <Users class="h-4 w-4 group-hover:text-avocado-400 dark:group-hover:text-avocado-600"></Users>
            <div class="-mb-[1px] text-xs font-medium text-foreground/80 group-hover:text-avocado-400 dark:group-hover:text-avocado-600">{githubInfo.authorGithubFollowers} followers</div>
          </a>
          <Separator orientation="vertical" />
          <div class="flex space-x-1 items-end">
            <MapPinned class="h-4 w-4"></MapPinned>
            <div class="-mb-[1px] text-xs font-medium text-foreground/80">{githubInfo.authorGithubLocation}</div>
          </div>
        </div>
        <Separator />
        <!-- 内容3:Coding -->
        <div class="font-bold text-base text-foreground/80">工作</div>
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          {#each siteConfig.codingInfo as codingInfo}
            <div class="flex items-center space-x-1">
              <BadgeCheck class="h-4 w-4 {codingInfo.color}" />
              <p class="text-xs font-medium text-foreground/80">{codingInfo.name}</p>
            </div>
          {/each}
        </div>
        <Separator />
        <!-- 内容4:Life -->
        <div class="font-bold text-base text-foreground/80">生活</div>
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          <a href="/pictures" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-avocado-400 dark:shadow-avocado-800 p-1">
            <Camera class="group-hover:animate-move-right-left h-4 w-4 fill-avocado-200 dark:fill-avocado-600"></Camera>
            <p class="text-xs font-medium text-foreground/80">摄影</p>
          </a>
          <a href="https://www.strava.com/athletes/duanyu" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-orange-400 dark:shadow-orange-800 p-1">
            <Bike class="group-hover:animate-move-right-left h-4 w-4 fill-orange-200 dark:fill-orange-600"></Bike>
            <p class="text-xs font-medium text-foreground/80">骑行</p>
          </a>
          <a href="https://space.bilibili.com/434180761" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-sky-400 dark:shadow-sky-800 p-1">
            <PiggyBank class="group-hover:animate-move-right-left h-4 w-4 fill-sky-200 dark:fill-sky-600"></PiggyBank>
            <p class="text-xs font-medium text-foreground/80">UP主</p>
          </a>
        </div>
        <Separator />
        <!-- 内容5:Social -->
        <div class="font-bold text-base text-foreground/80">社交</div>
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          <Drawer.Root>
            <Drawer.Trigger>
              <div class="group flex space-x-1 border bg-card rounded-lg shadow-sm py-1 px-2">
                <Icons.wechat class="group-hover:animate-move-right-left h-4 w-4"></Icons.wechat>
                <p class="text-xs font-medium text-foreground/80">WeChat</p>
              </div>
            </Drawer.Trigger>
            <Drawer.Content>
              <div class="mx-auto w-full max-w-sm p-12">
                <Drawer.Header>
                  <Drawer.Title class="text-center text-foreground/80">加个微信吧✌🏻</Drawer.Title>
                </Drawer.Header>
                <img class="rounded-xl" src="https://ddy-1310349779.cos.ap-shanghai.myqcloud.com/typora/wechat.jpg" />
              </div>
            </Drawer.Content>
          </Drawer.Root>
          <a href="https://space.bilibili.com/434180761" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm py-1 px-2">
            <Icons.bilibili class="group-hover:animate-move-right-left h-4 w-4"></Icons.bilibili>
            <p class="text-xs font-medium text-foreground/80">Bilibili</p>
          </a>
          <a href="https://twitter.com/ddy_coding" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm py-1 px-2">
            <Icons.twitter class="group-hover:animate-move-right-left h-4 w-4 p-[2px]"></Icons.twitter>
            <p class="text-xs font-medium text-foreground/80">Twitter</p>
          </a>
          <a href="https://github.com/ddy-ddy" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm py-1 px-2">
            <Icons.github class="group-hover:animate-move-right-left h-4 w-4 p-[1px]"></Icons.github>
            <p class="text-xs font-medium text-foreground/80">GitHub</p>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:col-span-5 space-y-6">
      <!-- 自我介绍内容 -->
      <div class="rounded-xl border bg-card text-card-foreground shadow p-8">
        <article class={proseStyle}>
          {@html htmlProfile}
        </article>
      </div>
      <!-- github项目展示 -->
      {#if githubInfo.authorGithubRepo.length > 0}
        {#each githubInfo.authorGithubRepo as repo}
          <div class="flex items-center justify-center [&amp;>div]:w-full">
            <div class="rounded-xl border bg-card text-card-foreground shadow">
              <div class="flex-col p-6 grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div class="space-y-1">
                  <h3 class="font-semibold leading-none tracking-tight text-foreground/80">{repo.name}</h3>
                  <p class="text-sm text-muted-foreground">{repo.description}</p>
                </div>
              </div>
              <div class="p-6 pt-0">
                <div class="flex space-x-4 text-sm font-medium text-foreground/60">
                  <div class="flex items-center">
                    <Album class="mr-1 h-3 w-3"></Album>
                    {repo.language}
                  </div>
                  <div class="flex items-center">
                    <Album class="mr-1 h-3 w-3 "></Album>
                    {repo.star}
                  </div>
                  <div class="flex items-center">
                    <Album class="mr-1 h-3 w-3 "></Album>
                    {repo.fork}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>
