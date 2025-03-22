// Load the Soummam Watershed shapefile (replace with the correct path to your asset)
var soummamWatershed = ee.FeatureCollection('projects/ee-nokml/assets/Soummam_watershed');

// Load the SRTM Digital Elevation Model (DEM)
var dem = ee.Image("USGS/SRTMGL1_003").clip(soummamWatershed);

// Center the map on the Soummam Watershed
Map.centerObject(soummamWatershed, 8);

// Calculate the slope, aspect, and hillshade using the terrain() function
var terrain = ee.Terrain.products(dem);

// Extract slope, aspect, and hillshade from the terrain products
var slope = terrain.select('slope').clip(soummamWatershed);
var aspect = terrain.select('aspect').clip(soummamWatershed);
var hillshade = terrain.select('hillshade').clip(soummamWatershed);

// Visualization parameters for slope
var slopeVis = {
  min: 0,
  max: 60,
  palette: ['white', 'yellow', 'orange', 'red']
};

// Visualization parameters for aspect
var aspectVis = {
  min: 0,
  max: 360,
  palette: ['blue', 'green', 'yellow', 'red']
};

// Visualization parameters for hillshade
var hillshadeVis = {
  min: 0,
  max: 255,
  palette: ['000000', 'ffffff'] // Black (shadow) to white (light)
};

// Add slope, aspect, and hillshade layers to the map
Map.addLayer(slope, slopeVis, 'Slope');
Map.addLayer(aspect, aspectVis, 'Aspect');
Map.addLayer(hillshade, hillshadeVis, 'Hillshade');

// Add the Soummam watershed layer to the map for reference
Map.addLayer(soummamWatershed, {}, 'Soummam Watershed');

// --------------------------------------
// Export Slope, Aspect, and Hillshade Maps to Google Drive

// Export slope map to Google Drive
Export.image.toDrive({
  image: slope,
  description: 'SlopeMap_Soummam',
  folder: 'earthengine',
  region: soummamWatershed.geometry().bounds(),
  scale: 30,
  maxPixels: 1e13
});

// Export aspect map to Google Drive
Export.image.toDrive({
  image: aspect,
  description: 'AspectMap_Soummam',
  folder: 'earthengine',
  region: soummamWatershed.geometry().bounds(),
  scale: 30,
  maxPixels: 1e13
});

// Export hillshade map to Google Drive
Export.image.toDrive({
  image: hillshade,
  description: 'HillshadeMap_Soummam',
  folder: 'earthengine',
  region: soummamWatershed.geometry().bounds(),
  scale: 30,
  maxPixels: 1e13
});
