<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { ViewVertical } from "radix-icons-svelte";
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Sheet from "$lib/components/ui/sheet";
  import { siteConfig, logoRingStyle } from "$lib/config/site";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Search } from "$lib/components/page/";
  let open = false;
  function handleNavClick() {
    open = false; //点击导航链接后关闭侧边栏
  }
</script>

<!-- 
  supports-[backdrop-filter]:bg-background/60:半透明背景
  sticky top-0: 固定在页面顶部
  z-50: 层叠顺序较高
  w-full: 宽度充满整个容器
  border-b: 底部有边框
  bg-background/95: 背景颜色的透明度设置为95%
  shadow-sm: 轻微的阴影
  backdrop-blur: 模糊的背景效果
 -->
<header class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
  <!-- 容器，flex布局，高度-14，容器内的子元素在垂直方向上居中对齐 -->
  <div class="container flex h-14 items-center">
    <div class="hidden md:flex space-x-6">
      <!-- MainNav-logo -->
      <a href="/" class="flex items-center space-x-1" rel="logo">
        <Avatar.Root class={logoRingStyle}>
          <Icons.logo class="ml-[1px]" />
        </Avatar.Root>
        <span class="text-base text-foreground/80 font-bold text-[15px]">{siteConfig.siteInfo.title}</span>
      </a>
      <!-- MainNav-mid -->
      <nav class="flex items-center justify-between space-x-4 text-sm font-medium">
        {#each siteConfig.mainNav as nav}
          <a href={nav.path} class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === nav.path ? "text-foreground" : "text-foreground/60")}>{nav.name}</a>
        {/each}
      </nav>
    </div>
    <!-- MobileNav -->
    <Sheet.Root bind:open>
      <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} variant="ghost" class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <ViewVertical class="h-5 w-5" />
          <span class="sr-only">侧边栏菜单</span>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left" class="pr-0">
        <a on:click={handleNavClick} href="/" class="flex items-center space-x-1" rel="logo">
          <Avatar.Root class={logoRingStyle}>
            <Icons.logo class="ml-[1px]" />
          </Avatar.Root>
          <span class="font-bold">{siteConfig.siteInfo.title}</span>
        </a>
        <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
          <div class="flex flex-col space-y-3">
            {#each siteConfig.mainNav as nav}
              <a on:click={handleNavClick} href={nav.path} class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === nav.path ? "text-foreground" : "text-foreground/60")}>{nav.name}</a>
            {/each}
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Root>
    <div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4">
      <!-- MainNav-search -->
      <div class="w-full flex-1">
        <Search />
      </div>
      <!-- MainNav-right -->
      <nav class="flex items-center">
        <a href="https://github.com/ddy-ddy" target="_blank" rel="github">
          <div class={cn(buttonVariants({ size: "sm", variant: "ghost" }), "w-9 px-0")}>
            <Icons.github class="h-4 w-4" />
            <span class="sr-only">GitHub</span>
          </div>
        </a>
        <a href="https://twitter.com/ddy_coding" target="_blank" rel="twitter">
          <div class={cn(buttonVariants({ size: "sm", variant: "ghost" }), "w-9 px-0")}>
            <Icons.twitter class="h-3 w-3 fill-current" />
            <span class="sr-only">X</span>
          </div>
        </a>
        <Button on:click={toggleMode} variant="ghost" class="w-9 px-0">
          <Sun class="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-roate-90 dark:scale-0" />
          <Moon class="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </div>
  </div>
</header>
