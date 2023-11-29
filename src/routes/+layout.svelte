<script>
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<div class="relative flex min-h-screen flex-col">
  <slot />
</div>
