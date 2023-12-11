<script lang="ts">
  export let data;
</script>

<article class="prose max-w-none dark:prose-invert">
  <div class="container">
    <svelte:component this={data.ReadMe} />
  </div>
</article>
