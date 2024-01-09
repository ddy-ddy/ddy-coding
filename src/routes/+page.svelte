<script lang="ts">
  import type { PageData } from "./$types";
  import { proseStyle } from "$lib/config/prose";

  export let data: PageData;
  let authorInfo: any = data.authrorInfo;
  let htmlProfile: any = authorInfo.authorProfile;
</script>

<div class="container max-w-3xl py-6 md:py-8 lg:py-10">
  <article class={proseStyle}>
    {@html htmlProfile}
  </article>
</div>
