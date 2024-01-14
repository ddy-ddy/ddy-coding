<script lang="ts">
  import type { PageData } from "./$types";
  import { cn } from "$lib/utils";
  import { proseStyle } from "$lib/config/prose";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Separator } from "$lib/components/ui/separator";
  import { Icons } from "$lib/components/icons";
  import { Users, MapPinned, BadgeCheck, Camera, Bike, PiggyBank, Album, Star, GitFork, Languages, Clock, Calendar, GithubIcon } from "lucide-svelte";
  import { siteConfig } from "$lib/config/site";
  import * as Drawer from "$lib/components/ui/drawer";
  import Github from "$lib/components/icons/github.svelte";

  export let data: PageData;
  let authorInfo: any = data.authorInfo;
  let githubInfo: any = data.githubInfo;
  let githubRepoInfo: any = data.githubRepoInfo;
  let videoInfo: any = data.videoInfo;
  let htmlProfile: any = authorInfo.authorProfile;
</script>

<section class="container py-6 md:py-8 lg:py-10 max-w-6xl">
  <div class="grid gap-4 lg:grid-cols-7">
    <!-- 展示 -->
    <div class="lg:col-span-2 p-8">
      <div class="flex flex-col justify-center space-y-4">
        <!-- 内容1:logo -->
        <Avatar.Root class="h-32 w-32 lg:h-48 lg:w-48 bg-ddy-200 dark:bg-ddy-600 self-center">
          <Icons.logo class="ml-[1px] hover:animate-move-right-left" />
        </Avatar.Root>
        <Separator />
        <!-- 内容2:名称 -->
        <div class="flex flex-col space-y-[2px] text-left">
          <div class="font-bold text-lg text-foreground/80">{authorInfo.author}</div>
          <div class="text-xs text-foreground/60">{authorInfo.authorMotto}</div>
        </div>
        {#if Object.keys(githubInfo).length != 0}
          <div class="flex space-x-2">
            <a class="group flex space-x-1 items-end" href="https://github.com/ddy-ddy?tab=followers">
              <Users class="h-4 w-4 stroke-foreground/70 group-hover:text-ddy-400 dark:group-hover:text-ddy-600"></Users>
              <div class="-mb-[1px] text-xs font-medium text-foreground/70 group-hover:text-ddy-400 dark:group-hover:text-ddy-600">{githubInfo.followers} followers</div>
            </a>
            <Separator orientation="vertical" />
            <div class="flex space-x-1 items-end">
              <MapPinned class="h-4 w-4 stroke-foreground/70"></MapPinned>
              <div class="-mb-[1px] text-xs font-medium text-foreground/70">{githubInfo.location}</div>
            </div>
          </div>
        {/if}
        <Separator />
        <!-- 内容3:Coding -->
        <div class="font-bold text-base text-foreground/80">工作</div>
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          {#each siteConfig.codingInfo as codingInfo}
            <div class="flex items-center space-x-1">
              <BadgeCheck class="h-4 w-4 {codingInfo.color}" />
              <p class="text-xs font-medium text-foreground/70">{codingInfo.name}</p>
            </div>
          {/each}
        </div>
        <Separator />
        <!-- 内容4:Life -->
        <div class="font-bold text-base text-foreground/80">生活</div>
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          <a href="/pictures" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-yellow-400 dark:shadow-yellow-800 p-1">
            <Camera class="group-hover:animate-move-right-left h-4 w-4 fill-yellow-200 dark:fill-yellow-600"></Camera>
            <p class="text-xs font-medium text-foreground/70">摄影</p>
          </a>
          <a href="https://www.strava.com/athletes/duanyu" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-orange-400 dark:shadow-orange-800 p-1">
            <Bike class="group-hover:animate-move-right-left h-4 w-4 fill-orange-200 dark:fill-orange-600"></Bike>
            <p class="text-xs font-medium text-foreground/70">骑行</p>
          </a>
          <a href="https://space.bilibili.com/434180761" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm shadow-sky-400 dark:shadow-sky-800 p-1">
            <PiggyBank class="group-hover:animate-move-right-left h-4 w-4 fill-sky-200 dark:fill-sky-600"></PiggyBank>
            <p class="text-xs font-medium text-foreground/70">UP主</p>
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
                <p class="text-xs font-medium text-foreground/70">WeChat</p>
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
            <p class="text-xs font-medium text-foreground/70">Bilibili</p>
          </a>
          <a href="https://twitter.com/ddy_coding" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm py-1 px-2">
            <Icons.twitter class="group-hover:animate-move-right-left h-4 w-4 p-[2px]"></Icons.twitter>
            <p class="text-xs font-medium text-foreground/70">Twitter</p>
          </a>
          <a href="https://github.com/ddy-ddy" target="_blank" class="group flex space-x-1 border bg-card rounded-lg shadow-sm py-1 px-2">
            <Icons.github class="group-hover:animate-move-right-left h-4 w-4 p-[1px]"></Icons.github>
            <p class="text-xs font-medium text-foreground/70">GitHub</p>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:col-span-5 space-y-6">
      <!-- 自我介绍内容 -->
      <div class="rounded-lg border bg-card shadow p-8">
        <article class={proseStyle}>
          {@html htmlProfile}
        </article>
      </div>
      <!-- github项目展示 -->
      {#if githubRepoInfo.length > 0}
        <div class="flex flex-col space-y-2">
          <div class="ml-2 font-bold text-base text-foreground/80">项目</div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each githubRepoInfo as repo}
              <div class="flex flex-col space-y-3 w-full rounded-lg border bg-card shadow p-4">
                <a href={repo.link} target="_blank" class="flex items-center space-x-2 group">
                  <GithubIcon class="h-4 w-4 stroke-foreground/70 group-hover:stroke-ddy-400 dark:group-hover:stroke-ddy-600"></GithubIcon>
                  <div class="line-clamp-1 text-sm font-bold text-foreground/70 group-hover:text-ddy-400 dark:group-hover:text-ddy-600">{repo.name}</div>
                </a>
                <div class="line-clamp-2 h-8 text-xs font-medium text-foreground/70">{repo.description}</div>
                <div class="flex space-x-6">
                  <a href={repo.link} target="_blank" class="group flex space-x-1">
                    <Star class="h-4 w-4 stroke-foreground/60 group-hover:stroke-ddy-400 dark:group-hover:stroke-ddy-600"></Star>
                    <p class="line-clamp-1 text-xs font-medium text-foreground/60 group-hover:text-ddy-400 dark:group-hover:text-ddy-600">{repo.star}</p>
                  </a>
                  <a href={repo.link} target="_blank" class="group flex space-x-1">
                    <GitFork class="h-4 w-4 stroke-foreground/60 group-hover:stroke-ddy-400 dark:group-hover:stroke-ddy-600"></GitFork>
                    <p class="line-clamp-1 text-xs font-medium text-foreground/60 group-hover:text-ddy-400 dark:group-hover:text-ddy-600">{repo.fork}</p>
                  </a>
                  {#if repo.language != null}
                    <a href={repo.link} target="_blank" class="group flex space-x-1">
                      <Languages class="h-4 w-4 stroke-foreground/60 group-hover:stroke-ddy-400 dark:group-hover:stroke-ddy-600"></Languages>
                      <p class="line-clamp-1 text-xs font-medium text-foreground/60 group-hover:text-ddy-400 dark:group-hover:text-ddy-600">{repo.language}</p>
                    </a>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      <!-- bilibili视频展示 -->
      <div class="flex flex-col space-y-2">
        <div class="ml-2 font-bold text-base text-foreground/80">视频</div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#if videoInfo.length > 0}
            {#each videoInfo as video}
              <a href={video.url} target="_blank" class="group flex flex-col space-y-2">
                <div class="overflow-hidden rounded-md">
                  <img class="h-24 w-full object-cover transition-all hover:scale-105 aspect-square" src={video.img_url} alt={video.name} />
                </div>
                <div class="line-clamp-2 h-8 text-xs font-medium text-foreground/70 group-hover:text-ddy-400 dark:group-hover:text-ddy-600">{video.name}</div>
                <div class="flex justify-between items-center">
                  <div class="flex space-x-1">
                    <Clock class="h-4 w-4 stroke-foreground/60"></Clock>
                    <p class="tracking-tight line-clamp-1 text-xs font-medium text-foreground/60">{video.time}</p>
                  </div>
                  <div class="flex space-x-1">
                    <Calendar class="h-4 w-4 stroke-foreground/60"></Calendar>
                    <p class="tracking-tighter line-clamp-1 text-xs font-medium text-foreground/60">{video.create_time}</p>
                  </div>
                </div>
              </a>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
