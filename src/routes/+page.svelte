<script lang="ts">
  export let data;
</script>

<article class="prose dark:prose-invert md:prose-md lg:prose-lg mx-auto">
  <div class="flex justify-center items-center">
    <div class="container">
      <svelte:component this={data.ReadMe} />
    </div>
  </div>
</article>
