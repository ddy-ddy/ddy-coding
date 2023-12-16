<script lang="ts">
  export let data;
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <article class="prose dark:prose-invert mx-auto md:prose-md lg:prose-lg">
    <svelte:component this={data.ReadMe} />
  </article>
</div>
