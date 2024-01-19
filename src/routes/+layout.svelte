<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { SiteHeader, SiteFooter } from "$lib/components/page";
  import { Toaster } from "$lib/components/ui/sonner";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  
  inject({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();
</script>

<ModeWatcher />
<Toaster />
<div class="relative flex flex-col min-h-screen">
  <SiteHeader />
  <div class="flex-1">
    <slot />
  </div>
  <SiteFooter />
</div>
