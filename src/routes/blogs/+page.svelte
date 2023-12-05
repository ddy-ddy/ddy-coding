<script lang="ts">
  import { ChevronRight } from "lucide-svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { cn } from "$lib/utils";
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
  <div class="mx-auto w-full min-w-0">
    <div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">博客</div>
      <ChevronRight class="h-4 w-4" />
      <div class="font-medium text-foreground">第一篇</div>
    </div>
    <div class="space-y-2">
      <h1 class={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>Theming</h1>
    </div>
    <Separator class="my-4 md:my-6" />
  </div>
</main>
