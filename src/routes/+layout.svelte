<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { SiteHeader, SiteFooter } from "$lib/components/page";
</script>

<ModeWatcher />

<div class="relative flex flex-col min-h-screen overflow-autor">
  <SiteHeader />
  <div class="flex-1">
    <slot />
  </div>
  <SiteFooter />
</div>


