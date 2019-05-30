require([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView"
  ], function(Map, GeoJSONLayer, MapView) {
    // If GeoJSON files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    const url = "http://brcsvweb03.envbop.net:52463/api/photos";


    // Paste the url into a browser's address bar to download and view the attributes
    // in the GeoJSON file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * time - the time of the event
    // Use out of box popupTemplate function DateString to format time field into a human-readable format



    const renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
symbol: {
type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
size: 6,
color: "black",
outline: {  // autocasts as new SimpleLineSymbol()
  width: 0.5,
  color: "white"
}
}
};
    const geojsonLayer = new GeoJSONLayer({
      url: url,
      copyright: "BOPRC",
      //popupTemplate: template,
      renderer: renderer //optional
    });

    const map = new Map({
      basemap: "gray",
      layers: [geojsonLayer]
    });

    const view = new MapView({
      container: "viewDiv",
      center: [176, -37],
      zoom: 5,
      map: map
    });
  });
