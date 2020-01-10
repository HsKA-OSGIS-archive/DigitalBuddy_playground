  var map = L.map('map').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
			
		
		L.marker([49.012504, 8.404122]).addTo(map)
		.bindPopup("<b>Welcome!</b><br />Congratulations on your....").openPopup();
		var popup = L.popup();
		
		function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
		}

		map.on('click', onMapClick);
		
		L.control.scale({maxwidth: 500}).addTo(map);

			setInterval(function(){
			map.setView([49.012504, 8.404122]);
		}
		);
		map.setView([49.012504,8.404122]);
	var geocoder = L.Control.geocoder().addTo(map)
	function createWalkButton(label, container) {
		var btn = L.DomUtil.create('button', '', container);
		btn.setAttribute('type', 'button');
		btn.innerHTML = label;
		btn.title = "Walking route";
		//return btn;
	}
	// Extend geocoder for custom buttons
		var geoPlan = L.Routing.Plan.extend({

	createGeocoders: function() {

		var container = L.Routing.Plan.prototype.createGeocoders.call(this),

			// Create a button for walking routes
			walkButton = createWalkButton('<img src="images/walk3.png" width="15px"'+'style="-webkit-clip-path: inset(0 0 5px 0); -moz-clip-path: inset(0 0 5px 0); clip-path: inset(0 0 5px 0);">', container);


				return container;
				}
		});
			
	function createButton(label, container) {
		var btn = L.DomUtil.create('button', '', container);
				btn.setAttribute('type', 'button');
				btn.innerHTML = label;
		return btn;
	}
	
	var control = L.Routing.control({
		position: 'bottomright',
		//router: L.Routing.graphHopper('fb200e9a-dc37-4ce5-b91d-35cda55c42f4'),
			
		waypoints: [L.latLng(49.012504, 8.404122),
				L.latLng(49.01555556, 8.39083333)],
			//router: L.Routing.graphHopper('fb200e9a-dc37-4ce5-b91d-35cda55c42f4'),
			// geocoder = L.Control.geocoder(),
			
			routeWhileDragging: true,
			reverseWaypoints: true,
			showAlternatives: true,
			show: false,
	}).addTo(map);
		
	
	map.on('click', function(e) {
	var container = L.DomUtil.create('div'),
		startBtn = createButton('Start from this location', container),
		destBtn = createButton('Go to this location', container);

		L.popup()
		.setContent(container)
		.setLatLng(e.latlng)
		.openOn(map);
		L.DomEvent.on(startBtn, 'click', function() {
				control.spliceWaypoints(0, 1, e.latlng);
				map.closePopup();
			});
		L.DomEvent.on(destBtn, 'click', function() {
		control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
			map.closePopup();
		});
	});
	