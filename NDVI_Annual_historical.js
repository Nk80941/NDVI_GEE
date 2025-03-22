// Define the Area of Interest
var geometry = ee.FeatureCollection('projects/ee-nokml/assets/Soummam_watershed');

// Load Sentinel-2 Image Collection and Filter by Date and Area
var S2 = ee.ImageCollection("LANDSAT/LE07/C02/T2_L2")
  .filterDate('2001-01-01', '2001-12-30')
  .filterBounds(geometry)
  .median();

// Define Bands ', 
var NIR = S2.select('SR_B4');
var RED = S2.select('SR_B3');

// Calculate NDVI
 var ndvi = NIR.subtract(RED).divide(NIR.add(RED)).rename('NDVI');
var NDVI = ndvi.clip(geometry);


// Display Results
var ndviparam = {min: -1, max: 1, palette: ['white', 'green']};

Map.addLayer(NDVI, ndviparam, 'NDVI');


// Export Results
Export.image.toDrive({ image: NDVI.toFloat(), description: 'NDVI_2000_LANDSAT', scale: 30, region: geometry, maxPixels: 1e13 });

