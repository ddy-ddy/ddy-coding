<script lang="ts">
  import type { PageData } from "./$types";
  import * as Tabs from "$lib/components/ui/tabs";
  import { MapPin, ImageIcon, ChevronDown, Expand, Minimize, Maximize, Sun, Moon } from "lucide-svelte";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import AMapLoader from "@amap/amap-jsapi-loader";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  export let data: PageData;
  let pictures: any = data.pictures;
  let mapToken: any = data.mapToken;
  let map: any;

  let geolocation: any;
  let mapStyle = "normal";

  // 确保当前是在浏览器环境
  if (browser) {
    onMount(() => {
      AMapLoader.load({
        key: mapToken,
        version: "2.0",
        plugins: ["AMap.ControlBar", "AMap.ToolBar", "AMap.Scale", "AMap.Geolocation"],
      })
        .then((AMap) => {
          // 地图实例
          map = new AMap.Map("mapContainer", {
            pitch: 0, //地图俯仰角度，有效范围 0 度- 83 度
            viewMode: "3D", //地图模式
            rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
            pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
            zoom: 6, //初始化地图层级
            rotation: 0, //初始地图顺时针旋转的角度
            zooms: [2, 20], //地图显示的缩放级别范围
            center: [113.280637, 23.125178], //初始地图中心经纬度
            mapStyle: "amap://styles/normal", //设置地图的显示样式
          });
          //控制地图旋转插件
          var controlBar = new AMap.ControlBar({
            position: {
              right: "10px",
              top: "10px",
            },
          });
          //地图缩放插件
          var toolBar = new AMap.ToolBar({
            position: {
              right: "40px",
              top: "110px",
            },
          });
          // 比例尺
          var scale = new AMap.Scale({
            position: {
              right: "40px",
              bottom: "14px",
            },
          });
          for (var i = 0; i < pictures.length; i += 1) {
            var center = [pictures[i]["longitude"], pictures[i]["latitude"]];
            var icon = new AMap.Icon({
              image: pictures[i]["small_url"], // 替换为您想要显示的图片路径
              size: new AMap.Size(40, 40), // 设置图片的宽度和高度
              imageSize: new AMap.Size(40, 40), // 设置图片显示时的实际大小
            });
            var marker = new AMap.Marker({
              position: center,
              icon: icon,
              zIndex: 10,
              bubble: true,
              cursor: "pointer",
              clickable: true,
            });
            marker.setMap(map);
          }
          map.addControl(toolBar);
          map.addControl(controlBar);
          map.addControl(scale);
        })
        .catch((e) => {
          console.error(e);
        });
    });

    onDestroy(() => {
      map.destroy();
      map = null;
    });
  }

  function hadleMapDarkStyle() {
    if (mapStyle === "normal") {
      map.setMapStyle("amap://styles/dark");
      mapStyle = "dark";
    } else {
      map.setMapStyle("amap://styles/normal");
      mapStyle = "normal";
    }
  }
</script>

<Tabs.Root value="map" class="relative">
  <Tabs.List class="absolute items-center left-[calc(50vw-2.5rem)] top-4 z-40 shadow-lg">
    <Tabs.Trigger value="map"><MapPin class="w-4 h-4" /></Tabs.Trigger>
    <Tabs.Trigger value="pictures"><ImageIcon class="w-4 h-4" /></Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="pictures">
    <div class="container max-w-4xl py-16">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {#each pictures as picture}
          <AlertDialog.Root>
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
    </div>
  </Tabs.Content>
  <Tabs.Content value="map" class="relative z-20">
    <div id="mapContainer" class="w-screen h-[calc(100vh-3.5rem)]"></div>
    <div class="absolute right-[40px] top-[180px] z-40 flex space-x-2 bg-card shadow-lg rounded-lg p-2">
      <button on:click={hadleMapDarkStyle}>
        {#if mapStyle == "dark"}
          <Moon class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
        {:else}
          <Sun class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
        {/if}
      </button>
    </div>
  </Tabs.Content>
</Tabs.Root>
