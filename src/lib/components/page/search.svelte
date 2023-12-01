<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { onMount } from "svelte";

  let open = false;
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = !open;
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<Button variant="outline" class={cn("relative w-full justify-start text-sm text-muted-foreground hidden sm:pr-12 w:20 md:w-40 lg:w-64")} on:click={() => (open = true)} {...$$restProps}>
  <span class="hidden lg:inline-flex"> Search info... </span>
  <kbd class="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
    <span class="text-xs">⌘</span>K
  </kbd>
</Button>
<Command.Dialog bind:open>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>个人</Command.Item>
      <Command.Item>博客</Command.Item>
      <Command.Item>照片</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
