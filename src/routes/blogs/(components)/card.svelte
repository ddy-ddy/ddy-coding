<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  export let blog: any;
</script>

<div class="flex space-x-4">
  <img alt="img" class="hidden md:block w-24 h-24 rounded-md border bg-muted" src={blog.coverUrl} />
  <div class="flex flex-col space-y-1">
    <div class="flex-1 space-y-1">
      <h2 class="text-xl font-extrabold line-clamp-1">
        <a href="/">{blog.title}</a>
      </h2>
      <p class="text-sm text-muted-foreground line-clamp-2">{blog.summary}</p>
    </div>
    <div class="flex space-x-2">
      <p class="text-sm text-muted-foreground">{blog.publishTime}</p>
      <Separator orientation="vertical" />
      {#each blog.category as category}
        <a href="/" class="text-sm text-muted-foreground hover:text-sky-400">{category}</a>
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
