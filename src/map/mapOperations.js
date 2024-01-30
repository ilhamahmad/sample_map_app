import '@arcgis/core/assets/esri/themes/light/main.css';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export const webmap = new ArcGISMap({
    basemap: 'hybrid',
    navigation: {
        enabled: true
    }
});

const app = {
    map: webmap,
    extent: {
        xmin: 44.650,
        ymin: 38.35,
        xmax: 50.43,
        ymax: 41.92,
        spatialReference: 4326
    },
    scale: 10,
    zoom: 8,
    slider: false,
    sliderPosition: "top-left",
};

export let view = new MapView(app);

export function initialize(container) {
    view.container = container;
    return view;
}