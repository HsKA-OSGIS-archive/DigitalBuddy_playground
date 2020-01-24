      
	   var map = L.map('map').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);

  

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
//Geolocation default map
	map.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle;
	var locationFeature;
	
	function onLocationFound(e){
		var radius = e.accuracy;
		
		locationFeature = L.marker(e.latlng);
		locationFeature.addTo(map);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle = L.circle(e.latlng, radius);
		locationCircle.addTo(map);
	}
	
	map.on('locationfound', onLocationFound);	
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////city reg
      
	   var map1 = L.map('map1').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map1);
			
		
	
	var geocoder = L.Control.geocoder().addTo(map1)	
		
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
				graphHopperRouting1.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting1.route();
				graphHopperRouting1.setWaypoints(graphHopperRouting1.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting1.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting1.route();
				graphHopperRouting1.setWaypoints(graphHopperRouting1.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting1.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting1.route();
					graphHopperRouting1.setWaypoints(graphHopperRouting1.getWaypoints());
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
			graphHopperRouting1 = L.Routing.control({

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

		map1.addControl(graphHopperRouting1);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map1.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting1.spliceWaypoints(0, 1, e.latlng);
			map1.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting1.spliceWaypoints(graphHopperRouting1.getWaypoints().length - 1, 1, e.latlng);
			map1.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map1);
	});		
	//Geolocation default map

	map1.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle1;
	var locationFeature1;
	
	function onLocationFound1(e){
		var radius1 = e.accuracy;
		
		locationFeature1 = L.marker(e.latlng);
		locationFeature1.addTo(map1);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle1 = L.circle(e.latlng, radius1);
		locationCircle1.addTo(map1);
	}
	
	map1.on('locationfound', onLocationFound1);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tax id
      
	   var map2 = L.map('map2').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map2);
			

	var geocoder = L.Control.geocoder().addTo(map2)	
		
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
				graphHopperRouting2.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting2.route();
				graphHopperRouting2.setWaypoints(graphHopperRouting2.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting2.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting2.route();
				graphHopperRouting2.setWaypoints(graphHopperRouting2.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting2.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting2.route();
					graphHopperRouting2.setWaypoints(graphHopperRouting2.getWaypoints());
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
			graphHopperRouting2 = L.Routing.control({

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

		map2.addControl(graphHopperRouting2);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map2.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting2.spliceWaypoints(0, 1, e.latlng);
			map2.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting2.spliceWaypoints(graphHopperRouting2.getWaypoints().length - 1, 1, e.latlng);
			map2.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map2);
	});	
		//Geolocation default map

	map2.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle2;
	var locationFeature2;
	
	function onLocationFound2(e){
		var radius2 = e.accuracy;
		
		locationFeature2 = L.marker(e.latlng);
		locationFeature2.addTo(map2);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle2 = L.circle(e.latlng, radius2);
		locationCircle2.addTo(map2);
	}
	
	map2.on('locationfound', onLocationFound2);
	
	//////////////////////////////////////////////////////////////////////////////////////////////////banks
	      
	   var map3 = L.map('map3').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map3);
			
		
	
	var geocoder = L.Control.geocoder().addTo(map3)	
		
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
				graphHopperRouting3.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting3.route();
				graphHopperRouting3.setWaypoints(graphHopperRouting3.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting3.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting3.route();
				graphHopperRouting3.setWaypoints(graphHopperRouting3.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting3.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting3.route();
					graphHopperRouting3.setWaypoints(graphHopperRouting3.getWaypoints());
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
			graphHopperRouting3 = L.Routing.control({

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

		map3.addControl(graphHopperRouting3);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map3.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting3.spliceWaypoints(0, 1, e.latlng);
			map3.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting3.spliceWaypoints(graphHopperRouting3.getWaypoints().length - 1, 1, e.latlng);
			map3.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map3);
	});	
	
		//Geolocation default map

	map3.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle3;
	var locationFeature3;
	
	function onLocationFound3(e){
		var radius3 = e.accuracy;
		
		locationFeature3 = L.marker(e.latlng);
		locationFeature3.addTo(map3);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle3 = L.circle(e.latlng, radius3);
		locationCircle3.addTo(map3);
	}
	
	map3.on('locationfound', onLocationFound3);
	//////////////////////////////////////////////////////////////////////////////health
	
	      
	   var map4 = L.map('map4').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map4);
			

	var geocoder = L.Control.geocoder().addTo(map4)	
		
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
				graphHopperRouting4.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting4.route();
				graphHopperRouting4.setWaypoints(graphHopperRouting4.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting4.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting4.route();
				graphHopperRouting4.setWaypoints(graphHopperRouting.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting4.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting4.route();
					graphHopperRouting4.setWaypoints(graphHopperRouting4.getWaypoints());
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
			graphHopperRouting4 = L.Routing.control({

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

		map4.addControl(graphHopperRouting4);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map4.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting4.spliceWaypoints(0, 1, e.latlng);
			map4.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting4.spliceWaypoints(graphHopperRouting4.getWaypoints().length - 1, 1, e.latlng);
			map4.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map4);
	});	
	
		//Geolocation default map

	map4.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle4;
	var locationFeature4;
	
	function onLocationFound4(e){
		var radius4 = e.accuracy;
		
		locationFeature4 = L.marker(e.latlng);
		locationFeature4.addTo(map4);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle4 = L.circle(e.latlng, radius4);
		locationCircle4.addTo(map4);
	}
	
	map4.on('locationfound', onLocationFound4);
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////university
	      
	   var map5 = L.map('map5').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map5);

	var geocoder = L.Control.geocoder().addTo(map5)	
		
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
				graphHopperRouting5.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting5.route();
				graphHopperRouting5.setWaypoints(graphHopperRouting5.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting5.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting5.route();
				graphHopperRouting5.setWaypoints(graphHopperRouting5.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting5.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting5.route();
					graphHopperRouting5.setWaypoints(graphHopperRouting5.getWaypoints());
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
			graphHopperRouting5 = L.Routing.control({

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

		map5.addControl(graphHopperRouting5);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map5.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting5.spliceWaypoints(0, 1, e.latlng);
			map5.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting5.spliceWaypoints(graphHopperRouting5.getWaypoints().length - 1, 1, e.latlng);
			map5.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map5);
	});
	
		//Geolocation default map

	map5.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle5;
	var locationFeature5;
	
	function onLocationFound5(e){
		var radius5 = e.accuracy;
		
		locationFeature5 = L.marker(e.latlng);
		locationFeature5.addTo(map5);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle5 = L.circle(e.latlng, radius5);
		locationCircle5.addTo(map5);
	}
	
	map5.on('locationfound', onLocationFound5);
////////////////////////////////////////////////////////////////////////////////////////residence permit
      
	   var map6 = L.map('map6').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map6);
			

	var geocoder = L.Control.geocoder().addTo(map6)	
		
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
				graphHopperRouting6.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting6.route();
				graphHopperRouting6.setWaypoints(graphHopperRouting6.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting6.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting6.route();
				graphHopperRouting6.setWaypoints(graphHopperRouting6.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting6.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting6.route();
					graphHopperRouting6.setWaypoints(graphHopperRouting6.getWaypoints());
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
			graphHopperRouting6 = L.Routing.control({

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

		map6.addControl(graphHopperRouting6);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map6.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting6.spliceWaypoints(0, 1, e.latlng);
			map6.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting6.spliceWaypoints(graphHopperRouting6.getWaypoints().length - 1, 1, e.latlng);
			map6.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map6);
	});	
	
		//Geolocation residence permit

	map6.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle6;
	var locationFeature6;
	
	function onLocationFound6(e){
		var radius6 = e.accuracy;
		
		locationFeature6 = L.marker(e.latlng);
		locationFeature6.addTo(map6);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle6 = L.circle(e.latlng, radius6);
		locationCircle6.addTo(map6);
	}
	
	map6.on('locationfound', onLocationFound6);
	
	/////////////////////////////////public transport
	      
	   var map7 = L.map('map7').setView([49.012504, 8.404122], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map7);
			

	var geocoder = L.Control.geocoder().addTo(map7)	
		
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
				graphHopperRouting7.getRouter().options.urlParameters.vehicle = 'foot';
				graphHopperRouting7.route();
				graphHopperRouting7.setWaypoints(graphHopperRouting7.getWaypoints());
				console.log("Walking route");	
			}, this);

			// Event to generate biking routes
			L.DomEvent.on(bikeButton, 'click', function() {
				graphHopperRouting7.getRouter().options.urlParameters.vehicle = 'bike';
				graphHopperRouting7.route();
				graphHopperRouting7.setWaypoints(graphHopperRouting7.getWaypoints());
				console.log("Biking route");	
			}, this);

				// Event to generate driving routes
				L.DomEvent.on(carButton, 'click', function() {
					graphHopperRouting7.getRouter().options.urlParameters.vehicle = 'car';
					graphHopperRouting7.route();
					graphHopperRouting7.setWaypoints(graphHopperRouting7.getWaypoints());
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
			graphHopperRouting7 = L.Routing.control({

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

		map7.addControl(graphHopperRouting7);

		function createButton(label, container) {
			var rbtn = L.DomUtil.create('button', '', container);
			rbtn.setAttribute('type', 'button');
			rbtn.innerHTML = label;
			rbtn.title = "Start route location";
			return rbtn;
		}

	map7.on('click', function(e) {
		var container = L.DomUtil.create('div'),
			startBtn = createButton('Start', container),
			destBtn = createButton('Go', container);

	L.DomEvent.on(startBtn, 'click', function() {
			graphHopperRouting7.spliceWaypoints(0, 1, e.latlng);
			map7.closePopup();
	});

		L.DomEvent.on(destBtn, 'click', function() {
			graphHopperRouting7.spliceWaypoints(graphHopperRouting7.getWaypoints().length - 1, 1, e.latlng);
			map7.closePopup();
		});
		
	L.popup()
			.setContent(container)
			.setLatLng(e.latlng)
			.openOn(map7);
	});	
	
//Geolocation public transport ticket

	map7.locate({setView: true, watch: true, maxZoom: 13});
	var locationCircle7;
	var locationFeature7;
	
	function onLocationFound7(e){
		var radius7 = e.accuracy;
		
		locationFeature7 = L.marker(e.latlng);
		locationFeature7.addTo(map7);
		//.bindPopup("You are within " + radius + " meters from this point.").closePopup();
		
		locationCircle7 = L.circle(e.latlng, radius7);
		locationCircle7.addTo(map7);
	}
	
	map7.on('locationfound', onLocationFound7);

