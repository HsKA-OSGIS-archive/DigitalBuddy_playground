      
	   var map = L.map('map').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
			
		
		
		
		/*function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
		}

		map.on('click', onMapClick);
		
		L.control.scale({maxwidth: 500}).addTo(map);

			setInterval(function(){
			//map.setView([49.012504, 8.404122]);
		}
		);*/
		
		//map.setView([49.012504,8.404122]);
	var geocoder = L.Control.geocoder().addTo(map)	
		
	// GraphHopper foot/walk button
	function createWalkButton(label, container) {
		var rbtn = L.DomUtil.create('button', '', container);
		rbtn.setAttribute('type', 'button');
		rbtn.innerHTML = label;
		rbtn.title = "Walking route";
		return rbtn;
	}
	// GraphHopper bike button
	function createBikeButton(label, container) {
		var rbtn = L.DomUtil.create('button', '', container);
		rbtn.setAttribute('type', 'button');
		rbtn.innerHTML = label;
		rbtn.title = "Biking route";
		return rbtn;
	}
	//  GraphHopper car button
	function createCarButton(label, container) {
		var rbtn = L.DomUtil.create('button', '', container);
		rbtn.setAttribute('type', 'button');
		rbtn.innerHTML = label;
		rbtn.title = "Car route";
		return rbtn;
	}
	
	// Create a plan for the routing engine
	// This plan will create specific geocoding buttons
	// Extend L.Routing.Plan to create a custom plan for GraphHopper
	var geoPlan = L.Routing.Plan.extend({

	createGeocoders: function() {

		var container = L.Routing.Plan.prototype.createGeocoders.call(this),

			// Create a button for walking routes
			walkButton = createWalkButton('<img src="images/walk.png" width="15px"'+'style="-webkit-clip-path: inset(0 0 5px 0); -moz-clip-path: inset(0 0 5px 0); clip-path: inset(0 0 5px 0);">', container);

			// Create a button for biking routes
			bikeButton = createBikeButton('<img src="images/cycle.jpg" width="17px"'+'style="-webkit-clip-path: inset(0 0 5px 0); -moz-clip-path: inset(0 0 5px 0); clip-path: inset(0 0 5px 0);">', container);

			// Create a button for driving routes
			carButton = createCarButton('<img src="images/car5.jpg" width="15px"'+'style="-webkit-clip-path: inset(0 0 5px 0); -moz-clip-path: inset(0 0 5px 0); clip-path: inset(0 0 5px 0);">', container);

			// Event to generate walking routes
			L.DomEvent.on(walkButton, 'click', function() {
				graphHopperRouting.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting.route();
				graphHopperRouting.setWaypoints(graphHopperRouting.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting.route();
				graphHopperRouting.setWaypoints(graphHopperRouting.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting.route();
					graphHopperRouting.setWaypoints(graphHopperRouting.getWaypoints());
					console.log("Driving route");	
					}, this);
		
				return container;
				}
		});

		// Create a plan for the routing
		var plan = new geoPlan(

			// Empty waypoints
			[],

			{
				// Default geocoder
				geocoder: new L.Control.Geocoder(),

				// Create routes while dragging markers
				routeWhileDragging: true
				
				
			}),

			// Call the GH routing engine
			graphHopperRouting = L.Routing.control({

				// Empty waypoints
				waypoints: [],

				// Positioning of the routing engine in the window
				position: 'bottomright',

				// Draggable routes
				routeWhileDragging: true,

				// Online routing
				router: L.Routing.graphHopper('fb200e9a-dc37-4ce5-b91d-35cda55c42f4'),

				// Use the created plan for GH routing
				plan: plan,

				// Show the routing icon on a reloaded window
				show: true,

				// Enable the box to be collapsed
				collapsible: false,
				
				showAlternatives: true,

				// Collapse button which opens the routing icon (mouse over)
				// Fix this so the routing box closes when mouse leaves the routing window rather than the window "X"
				collapseBtn: function(itinerary) {
					var collapseBtn = L.DomUtil.create('span', itinerary.options.collapseBtnClass);
					L.DomEvent.on(collapseBtn, 'click', itinerary._toggle, itinerary);
					itinerary._container.insertBefore(collapseBtn, itinerary._container.firstChild);
				},

				// Alternative line styles
				altLineOptions: {
				styles: [{
					color: 'black',
					opacity: 0.15,
					weight: 9

				}, {
					color: 'yellow',

					opacity: 0.8,
					weight: 6
				}, {
					color: 'blue',
					opacity: 0.5,
					weight: 2
				}]
				}
		});

		map.addControl(graphHopperRouting);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting.spliceWaypoints(0, 1, e.latlng);
			map.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting.spliceWaypoints(graphHopperRouting.getWaypoints().length - 1, 1, e.latlng);
			map.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map);
	});	