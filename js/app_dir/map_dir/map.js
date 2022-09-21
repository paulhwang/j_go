let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 24.90, lng: 121.50 },
    zoom: 9,
  });
}

window.initMap = initMap;
