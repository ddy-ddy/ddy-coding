import type { PageLoad } from './$types';
import { urlBase, fetchData } from '$lib/config/site';


export const load: PageLoad = async (data: any) => {
    try {
        const mapToken = data["data"]["body"]["map_token"]

        const response = await fetchData(urlBase + "/api/pictures?pagination[pageSize]=100&filters[flag][$eq]=true&populate=*");
        const picturesInfo = response.data;

        const pictures: any = [];
        picturesInfo.map((picture: any) => {
            if (picture.attributes.exif_info.latitude && picture.attributes.exif_info.longitude) {
                pictures.push({
                    img_url: urlBase + picture["attributes"]["img"]["data"]["attributes"]["url"],
                    thumbnail_url: urlBase + picture["attributes"]["img"]["data"]["attributes"]["formats"]["thumbnail"]["url"],
                    small_url: urlBase + picture["attributes"]["img"]["data"]["attributes"]["formats"]["small"]["url"],
                    medium_url: urlBase + picture["attributes"]["img"]["data"]["attributes"]["formats"]["medium"]["url"],
                    large_url: urlBase + picture["attributes"]["img"]["data"]["attributes"]["formats"]["large"]["url"],
                    description: picture.attributes.exif_info.description,
                    create_time: picture.attributes.exif_info.datetime.split(" ")[0].replace(/:/g, "-"),
                    camera_make: picture.attributes.exif_info.camera_make,
                    len_make: picture.attributes.exif_info.len_make,
                    len_model: picture.attributes.exif_info.len_model,
                    f_number: picture.attributes.exif_info.f_number,
                    exposure_time: picture.attributes.exif_info.exposure_time,
                    latitude: picture.attributes.exif_info.latitude,
                    longitude: picture.attributes.exif_info.longitude,
                    widthLargeHeight: parseInt(picture["attributes"]["img"]["data"]["attributes"]["width"]) >= parseInt(picture["attributes"]["img"]["data"]["attributes"]["height"]),
                })
            }
        });

        // 处理聚类数据
        var points: any = [];
        for (var i = 0; i < pictures.length; i += 1) {
            var center = [pictures[i]["longitude"], pictures[i]["latitude"]];
            var picUrl = pictures[i]["thumbnail_url"];
            points.push({ lnglat: center, url: picUrl });
        }


        return {
            pictures: pictures,
            points: points,
            mapToken: mapToken
        }

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}