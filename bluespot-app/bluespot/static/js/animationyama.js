 // This example adds an animated symbol to a polyline.
 var marker=new google.maps.Marker({
  position: new google.maps.LatLng(35.621444, 139.748835),
});
 var map;
 var line;
 var lineCoordinates ={};
 var elevator;
 var infowindow = new google.maps.InfoWindow();
 var sdata = {};
 var elevations = [];//new Array(d.length);
 var d;

  var lineCoordinates = [];
  var locations = [];

  var markers = [];

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

  d = sdata.data;

  var mapOptions = {
    // samurai
    center: new google.maps.LatLng(Number(d[parseInt(d.length/2)].latitude), Number(d[parseInt(d.length/2)].longitude)), 
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };


  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

   // Create an ElevationService
   elevator = new google.maps.ElevationService();
  // Add a listener for the click event and call getElevation on that location
  // google.maps.event.addListener(map, 'click', getElevation);
  google.maps.event.addListener(map, 'click', setMarker);
  google.maps.event.addListener(map, 'rightclick', removeMarker);
  run();

  console.log(elevations);
  markers = null;
  //Clusterer
  var mcOptions = {gridSize: 50, maxZoom: 15};
  var markerCluster = new MarkerClusterer(map, markers);


  for (var cord in lineCoordinates){
        //console.log(lineCoordinates[cord]);
        $( "<div class='bar' id=" + cord+" style='border-top-width: 10px; height: 40px;width: 2px;'></div>" ).appendTo( ".graph" );
    }
      $( ".bar" ).mouseover(function() {
        var id = $(this).attr("id");
        console.log(id + " in");
        var pos = new google.maps.LatLng(lineCoordinates[id].lat(), lineCoordinates[id].lng());
        marker=new google.maps.Marker({
          position:pos,
        });
        marker.setMap(map);
        $("#para").text("Elevation: " + $(this).height() + " metr");
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

      // animateCircle();
      //elevate();
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

function populate(){
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

        // var markerOptions = {
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#FF0000',
        //   fillOpacity: 0.35,
        //   map: map,
        //   center: pos,
        //   radius: 10
        // };
        // // Add the circle for this city to the map.
        // cityCircle = new google.maps.Circle(markerOptions);


        markers.push(marker);
        //marker.setMap(map);
      }
    }
    // alert("populate");
  }

function spot1(){
  /* ********************
  // marker
  // ****************** */
  // spots!!!!
  var spots = [
  // var spots = [
              
    ['<div><h3><a href="http://takaozanyuho.com/food/500.html" class="arrow">大見晴亭</a></h3><br>業種：蕎麦 </div>',35.6250182,139.24325369999997,'icon_res', '大見晴亭', '業種：蕎麦'],


    ['<div><h3><a href="http://takaozanyuho.com/food/341.html" class="arrow">ごまどころ 権現茶屋</a></h3><br>業種：ラーメン 茶屋 蕎麦 </div>',35.6274313,139.25031119999994,'icon_res', 'ごまどころ 権現茶屋', '茶屋 蕎麦'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/272.html" class="arrow">仏舎利塔</a></h3><br>関連：ファミリー向き 歴史系 </div>',35.628230546916114,139.25118358187865,'icon_camp', '仏舎利塔', '関連：ファミリー向き 歴史系'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/249.html" class="arrow">天狗の腰掛杉</a></h3><br>関連：歴史系 自然系 </div>',35.626347971425574,139.2504192592163,'icon_camp', '天狗の腰掛杉', '関連：歴史系 自然系'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/246.html" class="arrow">浄心門</a></h3><br>関連：歴史系 </div>',35.63002804398336,139.25332677378844,'icon_camp', '浄心門', '関連：歴史系'],


    ['<div><h3><a href="http://takaozanyuho.com/food/240.html" class="arrow">十一丁目茶屋</a></h3><br>業種：蕎麦 </div>',35.6299806,139.25515229999996,'icon_res', '十一丁目茶屋', '業種：蕎麦'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/241.html" class="arrow">霞台展望台</a></h3><br>関連：デート向き ファミリー向き 自然系 </div>',35.630372497081,139.25571930422973,'icon_camp', '霞台展望台', '関連：デート向き ファミリー向き 自然系'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/239.html" class="arrow">男坂・女坂</a></h3><br>関連：歴史系 自然系 </div>',35.629055719003645,139.25186765208434,'icon_camp', '男坂・女坂', '関連：歴史系 自然系'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/236.html" class="arrow">たこ杉・ひっぱりだこ</a></h3><br>関連：歴史系 自然系 </div>',35.63012120789552,139.2544605667954,'icon_camp', 'たこ杉・ひっぱりだこ', '関連：歴史系 自然系'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/235.html" class="arrow">さる園（野草園）</a></h3><br>関連：デート向き ファミリー向き 自然系 </div>',35.629925,139.25493800000004,'icon_camp', 'さる園（野草園）', '関連：デート向き ファミリー向き 自然系'],


    ['<div><h3><a href="http://takaozanyuho.com/spot/32.html" class="arrow">薬王院</a></h3><br>関連：デート向き ファミリー向き 歴史系 </div>',35.62590517454949,139.25024682698358,'icon_camp', '薬王院', '関連：デート向き ファミリー向き 歴史系'],
          ];

  var icon_root_url = 'https://chart.googleapis.com/chart?';
  var icon_default = {
    url: icon_root_url + 'chst=d_map_pin_letter&chld=A|FF0000|0000FF'
  }
  var icon_res = {
    url: icon_root_url + 'chst=d_map_pin_icon&chld=restaurant|FE9A2E'
  }
  var icon_camp = {
    url: icon_root_url + 'chst=d_map_pin_icon&chld=camping|ADDE30'
  }

  var infoWindow = {};
  infoWindow = new google.maps.InfoWindow();
  var createSpot = function(latlng, category, name) {
        var icons;
        if(category == 'icon_res'){
          icons = icon_res;
        }
        else if(category == 'icon_camp'){
          icons = icon_camp;
        }
        else {
          icons = icon_default;
        }

        var spot = new google.maps.Marker({
          map: map,
          position: latlng,
          icon: icons,
          title: name,
          clickable: true  //★クリック有効無効
        });

        google.maps.event.addListener(spot, 'click', function() {
          html = "<b>" + name + "</b> <br/>" ;
          infoWindow.setContent(html);
          infoWindow.open(map,spot);
        });
  };
  for(var i = 0; i < spots.length; i++) {
      var spot = spots[i],
        latlng = new google.maps.LatLng(spot[1], spot[2]),
        category =  spot[3],
        name = spot[0];

      createSpot(latlng, category, name);
    }

}

function elevate () {
    //Add elevation
  // alert("elevate");
  var positionalRequest = { 'locations': lineCoordinates };

  elevator.getElevationForLocations(positionalRequest, function (results, status) {
    if (status == google.maps.ElevationStatus.OK) {
      // alert(results);
      for (var res in results){
        if (results[res]) {
            // console.log(results[res].elevation);
            // setTimeout(elevations.push(results[res].elevation), 10);
            // console.log("#"+res + ": " + results[res].elevation + "px");
            var height = parseInt(results[res].elevation*10);
            $("#"+res).attr("style", "border-top-width: " + height +"px;width: 4px; height: "+ (60-height)+"px;");
            // elevations[res] = results[res].elevation;
          }
        }
      }
    });
}

    function run(){
      var d = jQuery.Deferred(), 
      p=d.promise();
      //You can chain jQuery promises using .then
      // p.then(populate).then(elevate);
      p.then(populate).then(spot1);
      d.resolve();
    }

function getElevation(event) {
  var locations = [];

  // Retrieve the clicked location and push it on the array
  var clickedLocation = event.latLng;
  locations.push(clickedLocation);

  // Create a LocationElevationRequest object using the array's one value
  var positionalRequest = {
    'locations': locations
  }

  // Initiate the location request
  elevator.getElevationForLocations(positionalRequest, function(results, status) {
    if (status == google.maps.ElevationStatus.OK) {

      // Retrieve the first result
      if (results[0]) {

        // Open an info window indicating the elevation at the clicked position
        infowindow.setContent('The elevation at this point <br>is ' + results[0].elevation + ' meters.');
        infowindow.setPosition(clickedLocation);
        infowindow.open(map);
      } else {
        alert('No results found');
      }
    } else {
      alert('Elevation service failed due to: ' + status);
    }
  });
}

var testMarkers = [];

function setMarker(event) {

  // Retrieve the clicked location and push it on the array
  var clickedLocation = event.latLng;
  console.log("Added " + clickedLocation.lat() + " " + clickedLocation.lng());
  marker=new google.maps.Marker({
          position:clickedLocation,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
          }
        });
  marker.setMap(map);
  testMarkers.push(marker);
  $("#markerData").append("<div style='position: relative; right: 20px; top:0px;'> " + clickedLocation.lat() + " " + clickedLocation.lng() + "</div>");
}

function removeMarker(event) {

  // Retrieve the clicked location and push it on the array
  var clickedLocation = event.latLng; 
  console.log("Removed " + clickedLocation.lat() + " " + clickedLocation.lng());
  testMarkers[testMarkers.length-1].setMap(null);
  testMarkers.splice(testMarkers.length-1, 1);
  $("#markerData > div:last-child").remove();
}
