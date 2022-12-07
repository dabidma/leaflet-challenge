// initialize the map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4.25
});

//add map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//query url for earthquake data
let seven_day_earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//use d3 to grab data
d3.json(seven_day_earthquake_url).then(function(data){

    //create function to get earthquake size of marker
    function earthquake_size(magnitude){
        // if the magnitude equals 0 it will just add a marker
        if (magnitude === 0){
            return 1;
        }
        // else the size of the circle will increase by the multiple of 3
        return magnitude * 20000;
    };

    //create function to get earthquake depth color
    function earthquake_color(depth){
        if (depth <= 10){
            return "#31906E";
        }else if (depth <= 30){
            return "#3EB489";
        }else if (depth <= 50){
            return "#f7db11";
        }else if (depth <= 70){
            return "#fdb72a";
        }else if (depth <= 90){
            return "#fca35d";
        }else{
            return "#e3181c";
        }
    }

    //start creating markers
    for (let i = 0; i < data.features.length; i++) {
        let feature = data.features[i]
        // console.log(feature);

        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
            fillOpacity: 1,
            color: "white",
            fillColor: earthquake_color(feature.geometry.coordinates[2]),
            radius: earthquake_size(feature.properties.mag),
            stoke: true,
            weight: 0.5
        }).bindPopup(`<h2>Where: ${feature.properties.place}</h2><h3>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}</h3>`).addTo(myMap);
    }
    
});

//creating the legend for the map

let legend = L.control({position: "bottomright"})
legend.onAdd= function(){
    let div = L.DomUtil.create('div', 'info legend');
    let limits = ['-10-10', '10-30','30-50','50-70','70-90','90+'];
    let colors=['#31906E"',"#3EB489","#f7db11","#fdb72a", '#fca35d','#e3181c'];
    for (let i=0; i<limits.length; i++) {
        div.innerHTML+= `<p style="background-color:${colors[i]}" > ${limits[i]} </p>`
    }
    return div
};

legend.addTo(myMap)