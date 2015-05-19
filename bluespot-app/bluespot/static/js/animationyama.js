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
 var spots = []; //#spots
 var takaos; //#sweets

 var takaoClusterer;

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
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };


  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

   // Create an ElevationService
   elevator = new google.maps.ElevationService();
  // Add a listener for the click event and call getElevation on that location
  // google.maps.event.addListener(map, 'click', getElevation);
  // google.maps.event.addListener(map, 'click', setMarker);
  // google.maps.event.addListener(map, 'rightclick', removeMarker);
  run();

  console.log(elevations);
  markers = null;
  //Clusterer
  var mcOptions = {gridSize: 50, maxZoom: 15};
  // var markerCluster = new MarkerClusterer(map, markers);


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
      // elevate();
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
  
  //Changed spots --> spotsRaw
  //spots will be used for #spots or with add/remove functionality
  spotsRaw = [
    ['<div><h3><a href="" class="arrow">高尾山</a></h3><br>業種：GOAL </div>',35.63109133567183, 139.2564631998539,'icon_default', '高尾山', '業種：START'],
    ['<div><h3><a href="" class="arrow">高尾山</a></h3><br>業種：GOAL </div>',35.6251172068904, 139.24366101622581,'icon_goal', '高尾山', '業種：GOAL'],
    ['<div><h3><a href="" class="arrow">大見晴亭</a></h3><br>業種：蕎麦 </div>',35.625143369544226, 139.24349203705788,'icon_res', '大見晴亭', '業種：蕎麦'],
    ['<div><h3><a href="" class="arrow">高尾ビジターセンター</a></h3><br>業種：蕎麦 </div>',35.625007105628356, 139.2432251572609,'icon_camp', '高尾ビジターセンター', '関連：ファミリー向き 歴史系'],
    ['<div><h3><a href="" class="arrow">奥の院不動堂</a></h3><br>業種：蕎麦 </div>',35.62628252679487, 139.2492949962616,'icon_camp', '奥の院不動堂', '関連：ファミリー向き 歴史系'],
    ['<div><h3><a href="" class="arrow">高尾山薬王院</a></h3><br>業種：蕎麦 </div>',35.626201859734046, 139.24978584051132,'icon_camp', '高尾山薬王院', '関連：ファミリー向き 歴史系'],
    ['<div><h3><a href="" class="arrow">神変堂</a></h3><br>業種：蕎麦 </div>',35.629814356149964, 139.25312519073486,'icon_camp', '神変堂', '関連：ファミリー向き 歴史系'],
    ['<div><h3><a href="" class="arrow">（有）十一丁目茶屋</a></h3><br>業種：蕎麦 </div>',35.63022857282676, 139.2554211616516,'icon_res', '（有）十一丁目茶屋', '業種：蕎麦'],
    ['<div><h3><a href="" class="arrow">キッチンむささび</a></h3><br>業種：蕎麦 </div>',35.63075179082443, 139.25607025623322,'icon_res', 'キッチンむささび', '業種：蕎麦'],

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
    url: icon_root_url + 'chst=d_map_pin_letter&chld=S|FF0000|0000FF'
  }
  var icon_res = {
    url: icon_root_url + 'chst=d_map_pin_icon&chld=restaurant|FE9A2E'
  }
  var icon_camp = {
    url: icon_root_url + 'chst=d_map_pin_icon&chld=camping|ADDE30'
  }
  var icon_goal = {
    url: icon_root_url + 'chst=d_map_pin_icon&chld=star|FF4000'
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
        else if(category == 'icon_goal'){
          icons = icon_goal;
        }
        else {
          icons = icon_default;
        }

        var spot = new google.maps.Marker({
          // map: map,
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
        spots.push(spot);
  };
  for(var i = 0; i < spotsRaw.length; i++) {
      var spot = spotsRaw[i],
        latlng = new google.maps.LatLng(spot[1], spot[2]),
        category =  spot[3],
        name = spot[0];

      createSpot(latlng, category, name);
    }

   $("#spots").change(function(){
     if (this.checked) {
      for(var i = 0; i < spots.length; i++) {
        spots[i].setMap(map);
      }
      console.log("added");
      console.log(spots);
    } else {
      for(var i = 0; i < spots.length; i++) {
        spots[i].setMap(null);
      }
      console.log("removed");
      console.log(spots);
    }
  });

}

function takaoCluster ()
{
    // takao marker cluster
  takaos = []
  var takao = [
      [35.63109133567183, 139.2564631998539],
      [35.63107825531919, 139.25645783543587],
      [35.63107662027495, 139.25647526979446],
      [35.63106462994957, 139.25646789371967],
      [35.63106190487538, 139.2564531415701],
      [35.63105045956272, 139.25644643604755],
      [35.631049369532846, 139.25647258758545],
      [35.63108915561322, 139.2564806342125],
      [35.63105318463732, 139.25645984709263],
      [35.63106299490506, 139.25647996366024],
      [35.630383358507785, 139.25573967397213],
      [35.63038444854672, 139.2557081580162],
      [35.63037191309795, 139.25569474697113],
      [35.630356107529344, 139.25569877028465],
      [35.63035556250967, 139.25572022795677],
      [35.63036319278462, 139.2557343095541],
      [35.63038390352725, 139.25575710833073],
      [35.63037245811752, 139.25575777888298],
      [35.63037191309795, 139.2557182163],
      [35.630393168857736, 139.2557229101658],
      [35.6303920788189, 139.25569005310535],
      [35.63038117842983, 139.25568334758282],
      [35.63036428282384, 139.2556806653738],
      [35.63040461426451, 139.2557430267334],
      [35.63013700932511, 139.2544837296009],
      [35.63012501885879, 139.2544274032116],
      [35.63009667774943, 139.25445556640625],
      [35.63010539809184, 139.25449177622795],
      [35.630018194624924, 139.25333842635155],
      [35.63001165436108, 139.25329953432083],
      [35.63002364484439, 139.25337329506874],
      [35.62966065941603, 139.25276175141335],
      [35.62963231814205, 139.25272554159164],
      [35.629298762393255, 139.25228163599968],
      [35.629299852447, 139.252340644598],
      [35.6293380043183, 139.25234332680702],
      [35.629388146750024, 139.25229638814926],
      [35.62935871532652, 139.25224006175995],
      [35.6293380043183, 139.25227493047714],
      [35.62906658060933, 139.25189271569252],
      [35.629029518665924, 139.25190344452858],
      [35.62904913969694, 139.25185650587082],
      [35.62902624849362, 139.25185918807983],
      [35.62901098768777, 139.25189539790154],
      [35.62903932918203, 139.25193697214127],
      [35.62861856596538, 139.25178542733192],
      [35.62873847280713, 139.25182297825813],
      [35.6274336586869, 139.2502310872078],
      [35.627485982469985, 139.25020694732666],
      [35.62752958559642, 139.25025790929794],
      [35.627485982469985, 139.25027668476105],
      [35.62744891979383, 139.25027668476105],
      [35.627414037259385, 139.25027400255203],
      [35.62739877614578, 139.2502123117447],
      [35.627431478528514, 139.25016939640045],
      [35.62737915470973, 139.2502847313881],
      [35.627374794389965, 139.25034910440445],
      [35.62742057773575, 139.25034373998642],
      [35.62746418089786, 139.25036251544952],
      [35.62750342372341, 139.25034642219543],
      [35.62754920699556, 139.2503222823143],
      [35.627490342783716, 139.2504134774208],
      [35.627440199161626, 139.2504134774208],
      [35.627374794389965, 139.25042152404785],
      [35.62733337134023, 139.25036251544952],
      [35.62732683085672, 139.25029546022415],
      [35.62733773166226, 139.2502498626709],
      [35.627361713429195, 139.25019353628159],
      [35.62753612606332, 139.25038933753967],
      [35.62732683085672, 139.25042420625687],
      [35.63038444854672, 139.2557081580162],
      [35.63037191309795, 139.25569474697113],
      [35.630356107529344, 139.25569877028465],
      [35.63035556250967, 139.25572022795677],
      [35.63036319278462, 139.2557343095541],
      [35.63038390352725, 139.25575710833073],
      [35.63037245811752, 139.25575777888298],
      [35.63037191309795, 139.2557182163],
      [35.630393168857736, 139.2557229101658],
      [35.6303920788189, 139.25569005310535],
      [35.63038117842983, 139.25568334758282],
      [35.63036428282384, 139.2556806653738],
      [35.63040461426451, 139.2557430267334],
      [35.63013700932511, 139.2544837296009],
      [35.63012501885879, 139.2544274032116],
      [35.63009667774943, 139.25445556640625],
      [35.63010539809184, 139.25449177622795],
      [35.630018194624924, 139.25333842635155],
      [35.63001165436108, 139.25329953432083],
      [35.63002364484439, 139.25337329506874],
      [35.62966065941603, 139.25276175141335],
      [35.62963231814205, 139.25272554159164],
      [35.629298762393255, 139.25228163599968],
      [35.629299852447, 139.252340644598],
      [35.6293380043183, 139.25234332680702],
      [35.629388146750024, 139.25229638814926],
      [35.62935871532652, 139.25224006175995],
      [35.6293380043183, 139.25227493047714],
      [35.62674908603641, 139.2500701546669],
      [35.62669240141406, 139.2500701546669],
      [35.62664225729153, 139.25007820129395],
      [35.626670599625506, 139.25011843442917],
      [35.62632613057762, 139.25041884183884],
      [35.62631304944531, 139.2503759264946],
      [35.62627162584546, 139.25043761730194],
      [35.62631522963417, 139.2504858970642],
      [35.62626072489456, 139.25051271915436],
      [35.625898812481104, 139.25028204917908],
      [35.62589009167982, 139.2502310872078],
      [35.62590971348131, 139.25018548965454],
      [35.62587701047614, 139.25018817186356],
      [35.62584648765927, 139.2503222823143],
      [35.625839947054104, 139.25026059150696],
      [35.62582468564006, 139.25019353628159],
      [35.62602526399248, 139.25031423568726],
      [35.626068867915535, 139.2503035068512],
      [35.62607540850197, 139.25038397312164],
      [35.62601436300799, 139.25038397312164],
      [35.62556088073653, 139.24864321947098],
      [35.62561320574525, 139.24863517284393],
      [35.62560666512103, 139.2485761642456],
      [35.625525997378325, 139.2485949397087],
      [35.62557396199192, 139.24869686365128],
      [35.62626726546527, 139.2490428686142],
      [35.62621494088457, 139.24908846616745],
      [35.62626944565538, 139.24911260604858],
      [35.62622148145905, 139.24901872873306],
      [35.62600346202202, 139.24721896648407],
      [35.6260645075243, 139.24722164869308],
      [35.625789802396966, 139.245585501194],
      [35.62578544199051, 139.24552112817764],
      [35.625741837912855, 139.24555331468582],
      [35.62574401811732, 139.24562573432922],
      [35.6257810815838, 139.24566060304642],
      [35.62582250543781, 139.24566060304642],
      [35.6258355866504, 139.24560964107513],
      [35.625597944287925, 139.2444857954979],
      [35.62564808906539, 139.24450725317],
      [35.62564808906539, 139.24442946910858],
      [35.62537120229278, 139.24413442611694],
      [35.62536684186348, 139.24407541751862],
      [35.625118297001116, 139.2436918616295],
      [35.62506597166851, 139.24366772174835],
      [35.62506161122257, 139.24372404813766],
      [35.62508995411686, 139.24361944198608],
      [35.625166261859306, 139.24375355243683],
      [35.625111756336416, 139.24375623464584],
      [35.62514009921294, 139.24361139535904],
      [35.62505507055324, 139.24361944198608],
      [35.62502890787051, 139.24368113279343],
      [35.62505071010671, 139.24378037452698],
      [35.625096494783364, 139.24381256103516],
      [35.62513355855002, 139.24381524324417],
      [35.625198965155164, 139.2437106370926],
      [35.625103035449314, 139.24354165792465],
      [35.6250703321142, 139.24356043338776],
      [35.625011466077275, 139.2437320947647]
    ];
  //Clusterer
  for (var i = takao.length - 1; i >= 0; i--) {
    var pos = new google.maps.LatLng(takao[i][0], takao[i][1]);
    var marker=new google.maps.Marker({
          position:pos,
        });
    takaos.push(marker)
  };
  takaoClusterer = new MarkerClusterer(map, takaos);
  takaoClusterer.clearMarkers();

  $("#sweets").change(function(){
     if (this.checked) {
      takaoClusterer.addMarkers(takaos);
    } else {
      takaoClusterer.clearMarkers(); 
    }
  });
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
      p.then(populate).then(spot1).then(takaoCluster);
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
  $("#markerData").append("<div style='position: relative; right: 0px; top:0px;'> " + '['+ clickedLocation.lat() + ", " + clickedLocation.lng() + '],' +"</div>");
}

function removeMarker(event) {

  // Retrieve the clicked location and push it on the array
  var clickedLocation = event.latLng; 
  console.log("Removed " + clickedLocation.lat() + " " + clickedLocation.lng());
  testMarkers[testMarkers.length-1].setMap(null);
  testMarkers.splice(testMarkers.length-1, 1);
  $("#markerData > div:last-child").remove();
}
