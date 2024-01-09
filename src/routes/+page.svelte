<script lang="ts">
  import type { PageData } from "./$types";
  import { proseStyle } from "$lib/config/prose";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Separator } from "$lib/components/ui/separator";
  import { Icons } from "$lib/components/icons";
  import { Users, MapPinned, Github, Twitter, Laugh } from "lucide-svelte";

  export let data: PageData;
  let authorInfo: any = data.authrorInfo;
  let htmlProfile: any = authorInfo.authorProfile;
</script>

<section class="container py-6 md:py-8 lg:py-10">
  <div class="grid gap-4 lg:grid-cols-7">
    <!-- 展示 -->
    <div class="rounded-xl border bg-card text-card-foreground shadow lg:col-span-2 p-8">
      <div class="flex flex-col justify-center space-y-4">
        <Avatar.Root class="h-48 w-48 bg-avocado-200 dark:bg-avocado-800 self-center">
          <Icons.logo class="ml-[1px]" />
        </Avatar.Root>
        <Separator />
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
        <div class="font-bold text-sm text-foreground/80">Technique</div>
        <div class="flex space-x-2">
          <Avatar.Root class="h-8 w-8 bg-avocado-200 dark:bg-avocado-800 self-center">
            <Icons.logo class="ml-[1px]" />
          </Avatar.Root>
          <Avatar.Root class="h-8 w-8 bg-avocado-200 dark:bg-avocado-800 self-center">
            <Icons.logo class="ml-[1px]" />
          </Avatar.Root>
        </div>
        <Separator />
      </div>
    </div>
    <!-- 内容 -->
    <div class="rounded-xl border bg-card text-card-foreground shadow lg:col-span-5 p-8">
      <article class={proseStyle}>
        {@html htmlProfile}
      </article>
    </div>
  </div>
</section>
