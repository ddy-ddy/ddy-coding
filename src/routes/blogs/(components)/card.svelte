<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import { createEventDispatcher } from "svelte";
  // 事件派发器，在点击博客类别的时候，能够把博客类名传递到+page.svelte
  const dispatch = createEventDispatcher();
  export let blog: any;
</script>

<div class="flex space-x-4">
  <img alt="img" class="hidden md:block w-24 h-24 rounded-md border bg-muted" src={blog.coverUrl} />
  <div class="flex flex-col space-y-1">
    <div class="flex-1 space-y-1">
      <a href={`/blogs/${blog.id}`} class="font-bold text-base md:text-lg lg:text-xl text-foreground/80">{blog.title}</a>
      <p class="text-sm text-foreground/60 line-clamp-2">{blog.summary}</p>
    </div>
    <div class="flex space-x-2">
      <p class="text-sm text-foreground/60">{blog.publishTime}</p>
      <Separator orientation="vertical" />
      {#each blog.category as category}
        <span role="button" tabindex="0" on:click={() => dispatch("infoFromCard", category)} class="text-sm text-foreground/60 hover:text-foreground/80 cursor-pointer">
          {category}
        </span>
        <Separator orientation="vertical" />
      {/each}
    </div>
  </div>
</div>
<Separator />

<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
