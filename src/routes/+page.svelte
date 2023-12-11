<script lang="ts">
  export let data;
</script>

<article class="prose dark:prose-invert">
  <div class="container">
    <main class="py-6">
      <svelte:component this={data.ReadMe} />
    </main>
  </div>
</article>
