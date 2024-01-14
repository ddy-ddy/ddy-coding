<script lang="ts">
  import { page } from "$app/stores";
  let errorInfo: any = $page.error?.message;
</script>

<h1>{errorInfo}</h1>
