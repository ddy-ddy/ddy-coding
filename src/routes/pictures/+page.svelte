<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { MapPinned, ImageIcon, ChevronDown, Sun, Moon, Navigation, Map, Columns, Plus, Minus, SatelliteDish, Compass, Maximize } from "lucide-svelte";
  import { setMode } from "mode-watcher";
  import * as Tabs from "$lib/components/ui/tabs";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Separator } from "$lib/components/ui/separator";
  import * as Tooltip from "$lib/components/ui/tooltip";

  // 服务端数据
  export let data: PageData;
  let pictures: any = data.pictures;
  let mapToken: any = data.mapToken;
  let points: any = data.points;

  // 地图实例变量
  let map: any;
  let geolocation: any;
  let satelliteLayer: any;

  // 地图样式
  let mapStyle = "normal";
  let isSatelliteLayer = false;
  let defaultZoom = 5.5; // 地图缩放级别
  let defaultCenter = [106.405285, 29.904989]; // 地图中心
  let defaultPitch = 50; // 俯视角度

  // 确保当前是在浏览器环境
  if (browser) {
    onMount(async () => {
      const AMapLoader = await import("@amap/amap-jsapi-loader");
      AMapLoader.load({
        key: mapToken,
        version: "2.0",
        plugins: ["AMap.ControlBar", "AMap.ToolBar", "AMap.Scale", "AMap.Geolocation", "AMap.MarkerClusterer", "AMap.MapType"],
      }).then((AMap) => {
        // 地图实例
        map = new AMap.Map("mapContainer", {
          pitch: defaultPitch,
          viewMode: "3D",
          rotateEnable: true,
          pitchEnable: true,
          zoom: defaultZoom,
          rotation: 0,
          zooms: [2, 20],
          center: defaultCenter,
          mapStyle: "amap://styles/normal",
        });

        // 卫星图层
        satelliteLayer = new AMap.TileLayer.Satellite();

        //控制地图旋转插件
        var controlBar = new AMap.ControlBar({
          position: {
            right: "10px",
            top: "10px",
          },
        });
        // 比例尺
        var scale = new AMap.Scale({
          position: {
            right: "40px",
            bottom: "14px",
          },
        });
        // 定位
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          zoomToAccuracy: true,
          position: {
            right: "40px",
            top: "110px",
          },
        });

        // 添加控制
        map.addControl(controlBar);
        map.addControl(scale);
        map.addControl(geolocation);

        // 自定义非聚合点样式
        var _renderMarker = function (context: any) {
          var imgUrl = context["data"][0]["url"];
          var content = `
               <img class="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover transition-all hover:scale-105 aspect-square" src=${imgUrl}>
             `;
          var offset = new AMap.Pixel(-9, -9);
          context.marker.setContent(content);
          context.marker.setOffset(offset);
        };

        // 自定义聚合点样式
        var _renderClusterMarker = function (context: any) {
          var clusterCount = context.count;
          var totalCount = points.length;
          var size = Math.round(30 + Math.pow(context.count / totalCount, 1 / 5) * 20);
          var imgUrl = context["clusterData"]["0"]["url"];
          var content = `
                  <div class="relative flex flex-col space-x-1 items-center justify-center">
                    <img class="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover transition-all aspect-square brightness-95 dark:brightness-75" src="${imgUrl}" />
                    <div class="absolute -right-2 -top-2 z-40 w-6 h-6 rounded-full bg-ddy-400 items-center shadow flex items-center justify-center">
                      <p class="text-xs font-bold text-foreground/80">${clusterCount}</p>
                    </div>
                  </div>
             `;
          context.marker.setContent(content);
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        };

        // 添加标记点聚类
        var cluster;
        cluster = new AMap.MarkerCluster(map, points, {
          gridSize: 60, // 聚合网格像素大小
          renderClusterMarker: _renderClusterMarker,
          renderMarker: _renderMarker,
        });
      });
    });
    onDestroy(() => {
      map.destroy();
      map = null;
    });
  }

  function handleMapDarkStyle() {
    // 切换地图样式
    if (mapStyle === "normal") {
      map.setMapStyle("amap://styles/dark");
      mapStyle = "dark";
      setMode("dark");
    } else {
      map.setMapStyle("amap://styles/normal");
      mapStyle = "normal";
      setMode("light");
    }
  }

  function goBackCenter() {
    // 返回地图中心
    map.setZoomAndCenter(defaultZoom, defaultCenter);
  }

  function handleZoomIn() {
    // 放大地图
    map.zoomIn();
  }

  function handleZoomOut() {
    // 缩小地图
    map.zoomOut();
  }

  function handleSatelliteLayer() {
    // 切换图层
    if (isSatelliteLayer) {
      map.remove(satelliteLayer);
      isSatelliteLayer = false;
    } else {
      map.add(satelliteLayer);
      isSatelliteLayer = true;
    }
  }
</script>

<Tabs.Root value="map" class="relative">
  <Tabs.List class="absolute items-center left-[calc(50vw-2.5rem)] top-4 z-40 shadow-lg">
    <Tabs.Trigger value="map"><Map class="w-4 h-4" /></Tabs.Trigger>
    <Tabs.Trigger value="pictures"><Columns class="w-4 h-4" /></Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="pictures">
    <div class="container max-w-6xl py-16">
      <div class="masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit mt-4">
        {#each pictures as picture}
          <div class="group relative break-inside mb-8 overflow-hidden hover:animate-move-right-left shadow-2xl hover:shadow-ddy-100 dark:hover:shadow-ddy-900">
            <img class="h-auto w-auto object-cover transition-all brightness-100 group-hover:brightness-75 dark:brightness-75 dark:group-hover:brightness-100" src={picture.large_url} alt={picture.description} />
            <button class="invisible group-hover:visible absolute bottom-2 right-2 bg-card/60 p-1 rounded-md">
              <Maximize class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-3"></Maximize>
            </button>
            <div class="invisible group-hover:visible absolute bottom-2 left-2 bg-card/60 p-1 rounded-md">
              <p class="text-xs font-medium text-foreground/70">{picture.create_time}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Tabs.Content>
  <Tabs.Content value="map" class="relative z-20">
    <div id="mapContainer" class="w-screen h-[calc(100vh-3.5rem)]"></div>
    <div class="absolute right-[40px] top-[160px] z-40 flex flex-col space-y-2 bg-card shadow-lg rounded-lg p-2">
      <!-- zoom in -->
      <button on:click={handleZoomIn} class="hidden lg:block">
        <Plus class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-3" />
      </button>
      <Separator class="hidden lg:block" />
      <!-- zoom out -->
      <button on:click={handleZoomOut} class="hidden lg:block">
        <Minus class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-3" />
      </button>
      <Separator class="hidden lg:block" />
      <!-- 控制深色模式 -->
      <button on:click={handleMapDarkStyle} class="cursor-pointer">
        {#if mapStyle == "dark"}
          <Moon class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
        {:else}
          <Sun class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
        {/if}
      </button>
      <Separator />
      <!-- 选择图层 -->
      <Tooltip.Root openDelay={0}>
        <Tooltip.Trigger class="w-4 h-4">
          <button on:click={handleSatelliteLayer} class="cursor-pointer">
            {#if isSatelliteLayer}
              <MapPinned class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
            {:else}
              <SatelliteDish class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
            {/if}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" class="mr-2">
          <p class="text-xs font-medium text-foreground/70">点击切换图层</p>
        </Tooltip.Content>
      </Tooltip.Root>
      <Separator />
      <!-- 返回地图中心 -->
      <Tooltip.Root openDelay={0}>
        <Tooltip.Trigger class="w-4 h-4">
          <button on:click={goBackCenter} class="cursor-pointer">
            <Compass class="w-4 h-4 stroke-foreground/60 hover:stroke-ddy-400 dark:hover:stroke-ddy-600 stroke-2" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" class="mr-2">
          <p class="text-xs font-medium text-foreground/70">点击返回中心</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  </Tabs.Content>
</Tabs.Root>
