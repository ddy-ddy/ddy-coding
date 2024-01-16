<script lang="ts">
  import type { PageData } from "./$types";
  import * as Tabs from "$lib/components/ui/tabs";
  import { MapPin, ImageIcon, ChevronDown } from "lucide-svelte";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";

  export let data: PageData;
  let pictures: any = data.pictures;
  let dialogOpen = false;
</script>

<div class="container max-w-4xl py-6 md:py-8 lg:py-10 flex flex-col gap-4">
  <Tabs.Root value="pictures" class="h-full">
    <Tabs.List>
      <Tabs.Trigger value="pictures"><ImageIcon class="w-4 h-4" /></Tabs.Trigger>
      <Tabs.Trigger value="map"><MapPin class="w-4 h-4" /></Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="pictures">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {#each pictures as picture}
          <AlertDialog.Root >
            <AlertDialog.Trigger>
              <div class="overflow-hidden rounded-md">
                <img class="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" src={picture.large_url} alt={picture.description} />
              </div>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <div class="flex flex-col space-y-4">
                <img class="h-auto w-auto" src={picture.large_url} alt={picture.description} />
                <div>{picture.description}</div>
              </div>
              <AlertDialog.Footer>
                <AlertDialog.Cancel class=""><ChevronDown /></AlertDialog.Cancel>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        {/each}
      </div>
    </Tabs.Content>
    <Tabs.Content value="map" class="h-full flex-col border-none p-0 data-[state=active]:flex">
      <div class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
        <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"></div>
      </div>
    </Tabs.Content>
  </Tabs.Root>
</div>
