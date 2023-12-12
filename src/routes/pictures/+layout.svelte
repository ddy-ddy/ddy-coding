<script lang="ts">
  import { BlogSidebarNav } from "$lib/components/page";
  import { docsConfig } from "$lib/config/blogs";
</script>

<div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] ">
  <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto">
    <div class="h-full py-6 pl-8 pr-6 lg:py-8">
      <BlogSidebarNav items={docsConfig.sidebarNav} />
    </div>
  </aside>
  <slot />
</div>
