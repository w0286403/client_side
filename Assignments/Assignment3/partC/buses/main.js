(function(){

        const map = L.map('theMap').setView([44.650627, -63.597140], 14);
        const busIcon = L.icon({
           iconUrl: 'bus.png',
           iconSize: [25,25]
       });
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: 18,
               minZoom: 10,
               attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
  
    
        fetch('https://prog2700.onrender.com/hrmbuses')
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let geoJson = transformToGeoJson(data);
            console.log(geoJson)
            L.geoJSON(geoJson,{

                pointToLayer: function (feature, latlng) {//SOURCE:https://gis.stackexchange.com/questions/245583/rotate-point-markers-geojson-leaflet
                    return L.marker(latlng, {icon: busIcon, rotationAngle: feature.properties.rotationAngle})
                },
                onEachFeature: onEachFeature
            }).addTo(map);

        })

    const onEachFeature = (feature, layer) => {//https://leafletjs.com/examples/geojson/
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }
    

    const transformToGeoJson = (json) => {

        let geoJson = {
            "type": "FeatureCollection",
            "features": [
            ]
        }

        json.entity.filter((bus)=> {
            if (bus.vehicle.trip.routeId <= 10){
                geoJson.features.push({                 
                    "type": "Feature",
                    "properties": {
                        "name": bus.id,
                        "popupContent": "ROUTE: " + bus.vehicle.trip.routeId,
                        "rotationAngle": bus.vehicle.position.bearing
                    },
                    "geometry": {
                        "coordinates": [
                            bus.vehicle.position.longitude,
                            bus.vehicle.position.latitude
                        ],
                        "type": "Point"
                    }
                })
            }
        })

        return geoJson;
    }
})()