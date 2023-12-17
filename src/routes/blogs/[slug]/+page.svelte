<script lang="ts">
  import type { PageData } from "./$types";
  import { marked } from "marked";
  export let data: PageData;
  const blog: any = data.blog;
  const htmlContent = marked(blog.content);
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10">
  <article class="prose dark:prose-invert mx-auto md:prose-md lg:prose-lg">
    {@html htmlContent}
  </article>
</div>
