<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { SiteHeader, SiteFooter } from "$lib/components/page";
</script>

<ModeWatcher />

<!-- 
  min-h-screen: 设置最小高度为视口的高度，确保即使内容不足时，元素也至少有整个屏幕的高度。
  flex-1: 将其扩展以填充剩余的可用空间
-->
<div class="relative flex flex-col min-h-screen">
  <SiteHeader />
  <div class="flex-1">
    <slot />
  </div>
  <SiteFooter />
</div>
