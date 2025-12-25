import { REGION_CONFIG } from '../constants';
import type { RegionName } from '../types';

/**
 * Checks if the provided value is a valid coordinate tuple [latitude, longitude].
 * 
 * A valid coordinate must:
 * - Be an array with exactly 2 elements
 * - Both elements must be numbers (not NaN)
 * - Latitude must be between -90 and 90
 * - Longitude must be between -180 and 180
 * 
 * @param coord - Value to check
 * @returns True if coord is a valid [number, number] tuple within valid ranges
 * 
 * @example
 * isValidCoordinate([48.3794, 31.1656]) // true
 * isValidCoordinate([NaN, 31.1656]) // false
 * isValidCoordinate([100, 200]) // false (out of bounds)
 * isValidCoordinate("48.3794, 31.1656") // false (wrong type)
 */
export function isValidCoordinate(coord: any): coord is [number, number] {
  if (!Array.isArray(coord) || coord.length !== 2) {
    return false;
  }
  
  const [lat, lng] = coord;
  
  // Check if both are numbers and not NaN
  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return false;
  }
  
  // Check latitude bounds (-90 to 90)
  if (lat < -90 || lat > 90) {
    return false;
  }
  
  // Check longitude bounds (-180 to 180)
  if (lng < -180 || lng > 180) {
    return false;
  }
  
  return true;
}

/**
 * Checks if the provided value is a valid zoom level.
 * 
 * A valid zoom level must:
 * - Be a number (not NaN)
 * - Be between 1 and 20 (inclusive)
 * 
 * @param zoom - Value to check
 * @returns True if zoom is a valid number between 1 and 20
 * 
 * @example
 * isValidZoom(6) // true
 * isValidZoom(NaN) // false
 * isValidZoom(-1) // false
 * isValidZoom(25) // false (out of bounds)
 */
export function isValidZoom(zoom: any): zoom is number {
  if (typeof zoom !== 'number' || isNaN(zoom)) {
    return false;
  }
  
  // Check zoom bounds (1 to 20)
  if (zoom < 1 || zoom > 20) {
    return false;
  }
  
  return true;
}

/**
 * Validates all regions in REGION_CONFIG at application startup.
 * 
 * This function checks that all region configurations have:
 * - Valid coordinates (within proper latitude/longitude bounds)
 * - Valid zoom levels (between 1 and 20)
 * 
 * If invalid data is found, it logs detailed error messages to the console.
 * This helps catch configuration issues early in development.
 * 
 * @example
 * validateRegionConfig() // Validates all regions and logs any errors
 */
export function validateRegionConfig(): void {
  const regionNames = Object.keys(REGION_CONFIG) as RegionName[];
  let hasErrors = false;
  
  for (const region of regionNames) {
    const config = REGION_CONFIG[region];
    
    // Validate coordinates
    if (!isValidCoordinate(config.center)) {
      hasErrors = true;
      console.error(
        `[VALIDATION ERROR] Invalid coordinates for region "${region}":`,
        config.center,
        `\nExpected: [latitude (-90 to 90), longitude (-180 to 180)]`
      );
    }
    
    // Validate zoom level
    if (!isValidZoom(config.zoom)) {
      hasErrors = true;
      console.error(
        `[VALIDATION ERROR] Invalid zoom level for region "${region}":`,
        config.zoom,
        `\nExpected: number between 1 and 20`
      );
    }
  }
  
  if (!hasErrors) {
    console.log('[VALIDATION] ✅ All region configurations are valid');
  } else {
    console.warn('[VALIDATION] ⚠️ Found validation errors in REGION_CONFIG');
  }
}
