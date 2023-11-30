<script>
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import { SiteHeader } from "$lib/components/page";
</script>

<ModeWatcher />
<div class="relative flex min-h-screen flex-col">
  <SiteHeader />
  <slot />
</div>
