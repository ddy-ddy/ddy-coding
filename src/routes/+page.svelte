<script lang="ts">
  export let data;
</script>

<div class="container max-w-3xl py-6 md:py-8 lg:py-10">
  <article class="prose dark:prose-dark mx-auto md:prose-md lg:prose-lg">
    <svelte:component this={data.ReadMe} />
  </article>
</div>
