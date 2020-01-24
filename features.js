var healthinsurance = {
		"type": "FeatureCollection",
		"features": [
		{ "type": "Feature", "properties": { "ID": 1, "name": "AOK", "type": "Public Health insurance", "address": "Innenstdat West", "x": 49.005606, "y": 8.396085, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [8.39608 ,49.00561  ] },"id": 1 },
		{ "type": "Feature", "properties": { "ID": 2, "name": "AOK", "type": "Public Health insurance", "address": "Kampus Sud", "x": 49.010842, "y": 8.414882, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [8.41488 ,49.01084  ] },"id": 2 },
		{ "type": "Feature", "properties": { "ID": 3, "name": "AOK", "type": "Public Health insurance", "address": "Ostring  11-5", "x": 49.012475, "y": 8.437112, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [8.43711 ,49.01248  ] },"id": 3 },
		{ "type": "Feature", "properties": { "ID": 4, "name": "AOK", "type": "Public Health insurance", "address": "Durlach", "x": 49.001087, "y": 8.465018, "postalcode": 76227 }, "geometry": { "type": "Point", "coordinates": [ 8.46502,  49.00109] },"id": 4 },
		{ "type": "Feature", "properties": { "ID": 5, "name": "TK ", "type": "Public Health insurance", "address": "Kaiserstrasse 198_197", "x": 49.009508, "y": 8.398407, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.39841,  49.00951] },"id": 5 },
		{ "type": "Feature", "properties": { "ID": 6, "name": "TK ", "type": "Public Health insurance", "address": "Kaiserstrasse 12", "x": 49.009285, "y": 8.412707, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [ 8.41271,  49.00928] },"id": 6 }
		]
		};	
		
var cityreg= {
"type": "FeatureCollection",
"name": "city_registration",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "ID": 1, "name": "Burgerburo Durlach ", "type": "burgerburo", "address": "Pfinztalstr.33", "x": 48.999302, "y": 8.471012, "postalcode": 76227 }, "geometry": { "type": "Point", "coordinates": [8.47101 ,48.9993  ] } },
{ "type": "Feature", "properties": { "ID": 2, "name": "Burgerbro K8 ", "type": "burgerburo", "address": "Kaiserallee 8 (main office)", "x": 49.011081, "y": 8.382162, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.38216,  49.01108 ] } },
{ "type": "Feature", "properties": { "ID": 3, "name": "Burgerburo Ost ", "type": "burgerburo", "address": "Beuthener Str. 42", "x": 49.034829, "y": 8.454273, "postalcode": 76139 }, "geometry": { "type": "Point", "coordinates": [ 8.45427,  49.03483] } },
{ "type": "Feature", "properties": { "ID": 4, "name": "Ortsverwaltung Grotzingen ", "type": "burgerburo", "address": "Rathausplatz 1", "x": 49.00855, "y": 8.495856, "postalcode": 76229 }, "geometry": { "type": "Point", "coordinates": [ 8.49586,  49.00855] } },
{ "type": "Feature", "properties": { "ID": 5, "name": "Ortsverwaltung Hohenwettersbach ", "type": "burgerburo", "address": "Kirchplatz 4", "x": 48.965486, "y": 8.477372, "postalcode": 76228 }, "geometry": { "type": "Point", "coordinates": [ 8.47737,  48.96549] } },
{ "type": "Feature", "properties": { "ID": 6, "name": " Ortsverwaltung Neureut ", "type": "burgerburo", "address": "Neureuter Haupstr. 256", "x": 49.052881, "y": 8.379242, "postalcode": 76149 }, "geometry": { "type": "Point", "coordinates": [8.37924 ,49.05288  ] } },
{ "type": "Feature", "properties": { "ID": 7, "name": "Ortsverwaltung Stupferich ", "type": "burgerburo", "address": "Kleinsteinbacher Str. 16", "x": 48.954802, "y": 8.511153, "postalcode": 76228 }, "geometry": { "type": "Point", "coordinates": [8.51115 , 48.9548 ] } },
{ "type": "Feature", "properties": { "ID": 8, "name": " Ortsverwaltung Wettersbach ", "type": "burgerburo", "address": "Am Wetterbach 40", "x": 48.957747, "y": 8.466623, "postalcode": 76228 }, "geometry": { "type": "Point", "coordinates": [ 8.46662,  48.95775] } },
{ "type": "Feature", "properties": { "ID": 9, "name": "Ortsverwaltung Wolfartsweier ", "type": "burgerburo", "address": "Rathausstr. 2", "x": 49.07808, "y": 8.470661, "postalcode": 76297 }, "geometry": { "type": "Point", "coordinates": [ 8.47066,  49.07808] } }
]
}

var banks = {
"type": "FeatureCollection",
"name": "banks",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "ID": 1, "name": "Sparkasse", "type": "Bank", "address": "Sparkasse Karl-Friedrich-Stra�e 8", "x": 49.009218, "y": 8.40343, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [ 8.40343,  49.00922] } },
{ "type": "Feature", "properties": { "ID": 2, "name": "Deutsche Bank", "type": "Bank", "address": "Kaiserstra�e 90", "x": 49.010096, "y": 8.401645, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [8.40165 , 49.0101 ] } },
{ "type": "Feature", "properties": { "ID": 3, "name": "Commerzbank", "type": "Bank", "address": "Karl-Friedrich-Stra�e 7", "x": 49.037531, "y": 8.407126, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.404642,  49.009017] } },
{ "type": "Feature", "properties": { "ID": 4, "name": "Sparkasse", "type": "Bank", "address": "KaiserStrasse", "x": 49.010077, "y": 8.392682, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.39268,  49.01008] } }
]
}

var universities = {
"type": "FeatureCollection",
"name": "banks",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "ID": 1, "name": "Hochschule Karlsruhe – Technik und Wirtschaft", "type": "University", "address": "Moltkestraße 30, 76133 Karlsruhe", "x": 49.015940, "y": 8.391738, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [ 8.391738,  49.015940] } },
{ "type": "Feature", "properties": { "ID": 2, "name": "KIT", "type": "University", "address": "Adenauerring 7", "x": 49.011145, "y": 8.416096, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [8.4416096 , 49.011445 ] } },
{ "type": "Feature", "properties": { "ID": 3, "name": "Karlsruhe University of Education", "type": "University", "address": "Bismarckstraße 10", "x": 49.013360, "y": 8.393104, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.411253,  49.011981] } },
{ "type": "Feature", "properties": { "ID": 4, "name": " Hochschule für Musik ", "type": "University", "address": "Am Schloss Gottesaue 7", "x": 49.004518, "y": 8.427288, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.427288,  49.004518] } }
]
}

var publictrans= {
"type": "FeatureCollection",
"name": "public_transport",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "ID": 1, "name": "KVV Kundenzentrum", "type": "Public Transport Ticket", "address": "Karl-Friedrich-Stra�e 9", "x": 49.008955, "y": 8.404156, "postalcode": 76133 }, "geometry": { "type": "Point", "coordinates": [ 8.40416,  49.00896] } },
{ "type": "Feature", "properties": { "ID": 2, "name": "KVV Kundenzentrum", "type": "Public Transport Ticket", "address": "Bahnhofpl. 1", "x": 48.994484, "y": 8.400127, "postalcode": 76137 }, "geometry": { "type": "Point", "coordinates": [ 8.40013,  48.99448] } }
]
}

var respermit= {
"type": "FeatureCollection",
"name": "res_permit",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "ID": 1, "name": "Auslanderbehorde", "type": "immigration Department", "address": "Kaiserallee 8", "x": 49.01112, "y": 8.382863, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [ 8.38286,  49.01112] } }
]
}

var taxid= {
"type": "FeatureCollection",
"name": "tax_id",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "ID": 1, "name": "Finanzamt Karlsruhe-Stadt", "type": "Tax Office", "address": "Schlo�pl. 14", "x": 49.010907, "y": 8.403623, "postalcode": 76131 }, "geometry": { "type": "Point", "coordinates": [ 8.40362,  49.01091] } }
]
}