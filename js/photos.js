require([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView"
  ], function(Map, GeoJSONLayer, MapView) {
    // If GeoJSON files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    const url = "http://brcsvweb03.envbop.net:52463/api/photos";

    const template = {
              title: "Photo Info",
              content: "<b>Name</b>: {name}</br>" +
                       "<b>Date</b>: {fileCreatedDate}</br>" +
                       "<b>Link</b>: <a href={url} target='_blank'>Link</a>"
            };

    const renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        size: 8,
        color: "orange",
        outline: {  // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white"
          }
        }
      };
    const geojsonLayer = new GeoJSONLayer({
      url: url,
      copyright: "BOPRC",
      popupTemplate: template,
      renderer: renderer //optional
    });

    const map = new Map({
      basemap: "gray",
      layers: [geojsonLayer]
    });

    const view = new MapView({
      container: "viewDiv",
      center: [176.8, -38.1],
      zoom: 10,
      map: map
    });
  });
