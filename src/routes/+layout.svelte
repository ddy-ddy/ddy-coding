<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { SiteHeader, SiteFooter } from "$lib/components/page";
  import { Toaster } from "$lib/components/ui/sonner";
  
</script>

<svelte:head>
	<title>ddy的个人网站</title>
	<meta name="description" content="这是ddy的个人网站，在这里可以查看我的简介，博客，摄影以及骑行信息" />
</svelte:head>

<ModeWatcher />
<Toaster />
<div class="relative flex flex-col min-h-screen">
  <SiteHeader />
  <div class="flex-1">
    <slot />
  </div>
  <SiteFooter />
</div>
