<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";
  import * as Dialog from ".";
  import { cn, flyAndScale } from "$lib/utils";
  import { X } from "lucide-svelte";

  type $$Props = DialogPrimitive.ContentProps;

  let className: $$Props["class"] = undefined;
  export let transition: $$Props["transition"] = flyAndScale;
  export let transitionConfig: $$Props["transitionConfig"] = {
    duration: 200,
  };
  export { className as class };
</script>

<Dialog.Portal>
  <Dialog.Overlay />
  <DialogPrimitive.Content {transition} {transitionConfig} class={cn("fixed z-50 w-full h-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] borderbg-background/80 backdrop-blur-sm", className)} {...$$restProps}>
    <slot />
    <DialogPrimitive.Close class="absolute right-4 top-4 bg-card shadow-lg rounded-lg p-2">
      <X class="h-4 w-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
      <span class="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
</Dialog.Portal>
