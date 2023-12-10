<script lang="ts">
  import { ChevronRight } from "lucide-svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { BlogPager, TableOfContents } from "$lib/components/page";
  import Balancer from "svelte-wrap-balancer";
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
  type Component = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
  $: component = data.component as unknown as Component;
  $: doc = data.metadata;
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
  <div class="mx-auto w-full min-w-0">
    <div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">Blogs</div>
      <ChevronRight class="h-4 w-4" />
      <div class="font-medium text-foreground">{doc.title}</div>
    </div>
    <div class="space-y-2">
      <h1 class={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>Theming</h1>
      {#if doc.description}
        <p class="text-lg text-muted-foreground">
          <Balancer>
            {doc.description}
          </Balancer>
        </p>
      {/if}
    </div>
    <Separator class="my-4 md:my-6" />
    <div class="mdsvex" id="mdsvex">
      <svelte:component this={component} />
    </div>
    <Separator class="my-4 md:my-6" />
    <BlogPager />
  </div>
  <div class="hidden text-sm xl:block">
    <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
      {#key $page.url.pathname}
        <TableOfContents />
      {/key}
    </div>
  </div>
</main>
