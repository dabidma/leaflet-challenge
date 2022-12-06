// initialize the map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

//add map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; 2022 &middot; <a href="https://maps.omniscale.com/">Omniscale</a> '
}).addTo(myMap);

