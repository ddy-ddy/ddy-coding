<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import { goto } from "$app/navigation";
  import { resetMode, setMode } from "mode-watcher";
  import { Circle, File, Laptop, Moon, Sun } from "radix-icons-svelte";
  let open = false;
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = true;
      }
    }
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
  function runCommand(cmd: () => void) {
    open = false;
    cmd();
  }
</script>

<Button variant="outline" class={cn("relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64")} on:click={() => (open = true)} {...$$restProps}>
  <span class="hidden lg:inline-flex"> Search documentation... </span>
  <span class="inline-flex lg:hidden">Search...</span>
  <kbd class="pointer-events-none absolute right-1.5  hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
    <span class="text-xs">⌘</span>K
  </kbd>
</Button>
