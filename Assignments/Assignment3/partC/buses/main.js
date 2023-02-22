(function(){

    //Function to grab data from API
    const getData = async () => {
        await fetch('https://prog2700.onrender.com/hrmbuses')//Fetch from address
        .then((response)=> response.json())
        .then((data) => {
            let geoJson = transformToGeoJson(data);//Assign transformed data
            //Create a new layer of buses and add to map
            busLayer = L.geoJSON(geoJson,{
                pointToLayer: (feature, latlng) => {//SOURCE:https://gis.stackexchange.com/questions/245583/rotate-point-markers-geojson-leaflet
                    return L.marker(latlng, {
                        icon: busIcon, 
                        rotationAngle: feature.properties.rotationAngle
                    }).bindPopup(feature.properties.popupContent)
                },
            }).addTo(map)
        })
    }

    //Function to filter API and return data as GEOJSON
    const transformToGeoJson = (json) => {

        let geoJson = {//Define a geoJson variable scaffolded out
            "type": "FeatureCollection",
            "features": [
            ]
        }

        json.entity.filter((bus)=> {//filter each but so the routeID is 10 or less
            if (bus.vehicle.trip.routeId <= 10){
                geoJson.features.push({//Push data for filtered buses to geojson                 
                    "type": "Feature",
                    "properties": {
                        "popupContent": "ROUTE: " + bus.vehicle.trip.routeId +//For Displaying data
                                        "<br>ID: " +  bus.id,
                        "rotationAngle": bus.vehicle.position.bearing //For rotating the bus image
                    },
                    "geometry": {
                        "coordinates": [//For displaying on map
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

    let busLayer = null
    const map = L.map('theMap').setView([44.650627, -63.597140], 14);
    const busIcon = L.icon({
        iconUrl: 'bus.png',
        iconSize: [30,40],
        iconAnchor: [15,20]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    getData()//Get data right away        
    setInterval(()=>{//Every 15 seconds remove the bus layer, and fetch data from API again
        map.removeLayer(busLayer)
        getData()        
    },15000)()
})()