<script lang="ts">
  import { Icons } from "$lib/icons";
  import { ViewVertical } from "radix-icons-svelte";
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { CommandMenu } from "$lib/components/docs";
  let open = false;
</script>

<header class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
  <div class="container flex h-14 items-center">
    <!-- MainNav -->
    <div class="mr-4 hidden md:flex">
      <a href="/" class="mr-6 flex items-center space-x-2">
        <Avatar.Root class="h-8 w-8">
          <Icons.logo class="h-8 w-8" />
        </Avatar.Root>
        <span class="hidden font-bold sm:inline-block text-[15px] lg:text-base"> ddy's website </span>
      </a>
      <nav class="flex items-center space-x-6 text-sm font-medium">
        <a href="/personal" class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === "/personal" ? "text-foreground" : "text-foreground/60")}>个人</a>
        <a href="/blogs" class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === "/blogs" ? "text-foreground" : "text-foreground/60")}>博客</a>
        <a href="/pictures" class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === "/pictures" ? "text-foreground" : "text-foreground/60")}>照片</a>
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
        <div class="flex items-center space-x-2">
          <Avatar.Root class="h-8 w-8">
            <Icons.logo class="h-8 w-8" />
          </Avatar.Root>
          <span class="font-bold">ddy's website </span>
        </div>
        <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
          <div class="flex flex-col space-y-3">
            <a href="/personal" class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === "/personal" ? "text-foreground" : "text-foreground/60")}>个人</a>
            <a href="/blogs" class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === "/blogs" ? "text-foreground" : "text-foreground/60")}>博客</a>
            <a href="/pictures" class={cn("transition-colors hover:text-foreground/80", $page.url.pathname === "/pictures" ? "text-foreground" : "text-foreground/60")}>照片</a>
            <a href="https://github.com/ddy-ddy" target="_blank" rel="github" class={cn("text-foreground/60 transition-colors hover:text-foreground/80 xl:block")}> GitHub </a>
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Root>
    <!-- Search -->
    <div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
      <div class="w-full flex-1 md:w-auto md:flex-none">
        <CommandMenu />
      </div>
      <nav class="flex items-center">
        <a href="https://github.com/ddy-ddy" target="_blank" rel="github">
          <div class={cn(buttonVariants({ size: "sm", variant: "ghost" }), "w-9 px-0")}>
            <Icons.gitHub class="h-4 w-4" />
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
          <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-roate-90 dark:scale-0" />
          <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </div>
  </div>
</header>
