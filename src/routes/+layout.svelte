<script>
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import { SiteHeader, SiteFooter } from "$lib/components/page";
  
</script>

<ModeWatcher />
<div class="relative flex min-h-screen flex-col">
  <SiteHeader />
  <div class="flex-1">
    <slot />
  </div>
  <SiteFooter />
</div>
