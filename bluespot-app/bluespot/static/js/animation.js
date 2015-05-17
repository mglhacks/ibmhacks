 // This example adds an animated symbol to a polyline.
 var marker=new google.maps.Marker({
  position: new google.maps.LatLng(35.621444, 139.748835),
});
 var map;
 var line;
 var lineCoordinates ={};
 var elevator;

 var sdata = {};

 function get_data (log_id) {

  $.ajax({
   url: "/logview/" + log_id,
   dataType: 'json',
   async: false,
   cache: false,
   timeout: 30000,
   success: function(json) {
     sdata = json;
   }
 });
}


function initialize() {

  var d = sdata.data;

  var mapOptions = {
    // samurai
    center: new google.maps.LatLng(Number(d[parseInt(d.length/2)].latitude), Number(d[parseInt(d.length/2)].longitude)), 
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };


  var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
  var markerClusterer = null;


  var lineCoordinates = [];

  var markers = [];
  for (var i = 0; i < d.length; i++) {
    if (Number(d[i].latitude)>0){
      var pos = new google.maps.LatLng(Number(d[i].latitude), Number(d[i].longitude));
      lineCoordinates.push(pos);
      marker=new google.maps.Marker({
        position:pos
        // icon: {
        //   path: google.maps.SymbolPath.CIRCLE,
        //   scale: 10
        // },
      });
      markers.push(marker);
      //marker.setMap(map);
    }

  };
  // var mcOptions = {gridSize: 50, maxZoom: 15};
  var markerCluster = new MarkerClusterer(map, markers);

  for (var cord in lineCoordinates){
        //console.log(lineCoordinates[cord]);
        $( "<div class='bar' id=" + cord+" style='height: 50px; border-top-width: 35px; width: 8.171875px;''></div>" ).appendTo( ".graph" );
      }
      $( ".bar" ).mouseover(function() {
        var id = $(this).attr("id");
        console.log(id + " in");
        var pos = new google.maps.LatLng(lineCoordinates[id].lat(), lineCoordinates[id].lng());
        marker=new google.maps.Marker({
          position:pos,
        });
        marker.setMap(map);
      });
      $( ".bar" ).mouseout(function() {
        var id = $(this).attr("id");
        console.log(id + " out");
        marker.setMap(null);
      });

      // Define the symbol, using one of the predefined paths ('CIRCLE')
      // supplied by the Google Maps JavaScript API.
      var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        strokeColor: '#393'
      };

      // Create the polyline and add the symbol to it via the 'icons' property.
      line = new google.maps.Polyline({
        path: lineCoordinates,
        strokeColor:"#FD5959",
        strokeOpacity:0.8,
        strokeWeight:1.5,

        icons: [{
          icon: lineSymbol,
          offset: '100%'
        }],
        map: map
      });

      animateCircle();
    }

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
function animateCircle() {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 100;

    var icons = line.get('icons');
    icons[0].offset = (count / 2) + '%';
    line.set('icons', icons);
  }, 40);
}

