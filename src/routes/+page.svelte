<script lang="ts">
  import type { PageData } from "./$types";
  import { proseStyle } from "$lib/config/prose";
  import * as Avatar from "$lib/components/ui/avatar";

  export let data: PageData;
  let authorInfo: any = data.authrorInfo;
  let htmlProfile: any = authorInfo.authorProfile;
</script>

<section class="container py-6 md:py-8 lg:py-10">
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <div class="rounded-xl bg-card text-card-foreground col-span-2">
      <div class="flex flex-col justify-center space-y-4 px-8">
        <Avatar.Root class="h-48 w-48 bg-avocado-200 self-center">
          <Avatar.Image src={authorInfo.authorIconLink} alt={authorInfo.author} />
          <Avatar.Fallback>{authorInfo.author}</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex flex-col space-y-[2px] text-left">
          <div class="font-medium text-foreground/80">{authorInfo.author}</div>
          <div class="text-xs text-foreground/60">{authorInfo.authorMotto}</div>
        </div>
        <div>
          <a class="flex space-x-1 items-center" href="https://github.com/ddy-ddy?tab=followers">
            <svg class="h-4 w-4" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
              <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
            </svg>
            <div class="text-xs text-foreground">156 <span class="text-xs text-foreground/60">followers</span></div>
          </a>
        </div>
        <div class="flex space-x-1 items-center">
          <svg class="h-4 w-4" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
          <div class="text-xs text-foreground">广州</div>
        </div>
      </div>
    </div>
    <div class="rounded-xl border bg-card text-card-foreground shadow col-span-5">
      <div class="p-8">
        <article class={proseStyle}>
          {@html htmlProfile}
        </article>
      </div>
    </div>
  </div>
</section>
