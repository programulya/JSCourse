(function initialize() {
    var myOptions = {
        zoom: 8,
        center: new google.maps.LatLng(50.414778, 30.519564),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        sensor: "true"
    }

    var map = new google.maps.Map(document.getElementById("google-container"), myOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.414778, 30.519564),
        map: map
    });
})();