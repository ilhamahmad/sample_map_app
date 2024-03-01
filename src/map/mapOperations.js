import '@arcgis/core/assets/esri/themes/light/main.css';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Sketch from "@arcgis/core/widgets/Sketch.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Locate from "@arcgis/core/widgets/Locate.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import Search from "@arcgis/core/widgets/Search.js";

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

export const view = new MapView(app);

export function initialize(container) {
    view.container = container;
    return view;
}

// layers
const graphicsLayer = new GraphicsLayer({ view }) // burada view yaratdığımız MapView dəyişənidir

// burada url hissəsi mövcud olan xəritə servisin ünvanıdır.
// nümunə üçün Amerika ştatları əlavə olunub
const demoFeatureLayer = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
})

const geojsonlayer = new GeoJSONLayer({
    url: "https://geoserver.ilhamahmad.xyz/geoserver/demo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=demo%3Aus_states&maxFeatures=100&outputFormat=application%2Fjson",
    copyright: "USGS Earthquakes"
});

webmap.add(graphicsLayer)
webmap.add(demoFeatureLayer)
webmap.add(geojsonlayer)

// end layers

// tools
let sketch = new Sketch({
    layer: graphicsLayer,
    view: view
});

let locateBtn = new Locate({
    view: view
});

let basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "topo-vector"  // növbəti altlıq xəritəni təyin edirik  
});

let searchWidget = new Search({
    view: view,
    allPlaceholder: 'Axtarış edin'
});

//top-right xəritə üzərində alətin yerləşəcəyi yeri göstərir
view.ui.add(sketch, 'top-right')
view.ui.add(locateBtn, 'top-left')
view.ui.add(basemapToggle, 'bottom-right')
// burada index vasitəsilə elementin yuxarıda I görünməyini təmin edirik 
view.ui.add(searchWidget, { position: 'top-left', index: 0 })
// end tools