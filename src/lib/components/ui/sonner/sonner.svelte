<script lang="ts">
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
  import { mode } from "mode-watcher";

  type $$Props = SonnerProps;
</script>

<Sonner
  theme={$mode}
  class="toaster group"
  toastOptions={{
    classes: {
      toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground/80 group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      description: "group-[.toast]:text-muted-foreground/70",
      actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground/70",
      cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground/70",
    },
  }}
  {...$$restProps}
/>
