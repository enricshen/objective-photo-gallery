mapboxgl.accessToken = 'pk.eyJ1IjoibHV2MnUyMDIwIiwiYSI6Ik1xdVpzT2MifQ.-ztdqdV1GdtBuVwaQjyfyQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [176.8, -38.1],
    zoom: 10
});

map.on('load', function() {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource("photos", {
        type: "geojson",
        // Point to GeoJSON data.

        data: "http://brcsvweb03.envbop.net:52463/api/photos",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "photos",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "photos",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "photos",
        filter: ["!", ["has", "point_count"]],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 6,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });

    // Click on a cluster
    map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('photos').getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err)
                return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        });
    });

// Click on a point
//When a click event occurs on a feature (id=unclustered-point) in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'unclustered-point', function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var description = "<strong>"+e.features[0].properties.name +"</strong>"+
                  "<br>Open Objective Photo: " + "<a href=\""+ e.features[0].properties.url+ "\" target=\"_blank\" title=\"Opens in a new window\"><em>HERE</em></a>" +
                  "<br>" + "<img src=\"" +e.features[0].properties.url+ "\" width=\”200\” height=\"100\"/>" +
                  "<br><strong>Created Date: </strong>"+e.features[0].properties.fileCreatedDate +
<<<<<<< HEAD
                  "<br><strong>Uploaded by: </strong>"+e.features[0].properties.owner
=======
>>>>>>> origin/version1


// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});

//Control mouse movement
map.on('mouseenter', 'clusters', function () {
  map.getCanvas().style.cursor = 'pointer';
    });
map.on('mouseleave', 'clusters', function () {
  map.getCanvas().style.cursor = '';
    });

map.on('mouseenter', 'unclustered-point', function () {
  map.getCanvas().style.cursor = 'pointer';
    });
map.on('mouseleave', 'unclustered-point', function () {
  map.getCanvas().style.cursor = '';
    });
});

//Add geocoder
map.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
}));
