<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Image } from "../(data)/images";

  let className: string | undefined | null = undefined;
  export let image: Image;
  export let aspectRatio: "portrait" | "square" = "square";
  export { className as class };
</script>

<div class={cn("space-y-3", className)} {...$$restProps}>
  <div class="overflow-hidden rounded-md">
    <img class={cn("h-auto w-auto object-cover transition-all hover:scale-105", aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square")} src={image.small_url} alt={image.description} />
  </div>
  <div class="space-y-1 text-sm">
    <h3 class="font-medium leading-none">{image.name}</h3>
    <p class="text-xs text-muted-foreground">{image.artist}</p>
  </div>
</div>
