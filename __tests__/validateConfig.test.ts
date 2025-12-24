import { describe, expect, test, jest } from '@jest/globals';
import { isValidCoordinate, isValidZoom, validateRegionConfig } from '../utils/validateConfig';
import { REGION_CONFIG } from '../constants';

describe('isValidCoordinate', () => {
  test('should accept valid coordinates [48.3794, 31.1656]', () => {
    expect(isValidCoordinate([48.3794, 31.1656])).toBe(true);
  });

  test('should accept coordinates at boundary values', () => {
    expect(isValidCoordinate([90, 180])).toBe(true);
    expect(isValidCoordinate([-90, -180])).toBe(true);
    expect(isValidCoordinate([0, 0])).toBe(true);
  });

  test('should reject coordinates with NaN [NaN, 31.1656]', () => {
    expect(isValidCoordinate([NaN, 31.1656])).toBe(false);
    expect(isValidCoordinate([48.3794, NaN])).toBe(false);
    expect(isValidCoordinate([NaN, NaN])).toBe(false);
  });

  test('should reject coordinates out of bounds [100, 200]', () => {
    expect(isValidCoordinate([100, 200])).toBe(false);
    expect(isValidCoordinate([91, 0])).toBe(false);
    expect(isValidCoordinate([-91, 0])).toBe(false);
    expect(isValidCoordinate([0, 181])).toBe(false);
    expect(isValidCoordinate([0, -181])).toBe(false);
  });

  test('should reject invalid format "48.3794, 31.1656"', () => {
    expect(isValidCoordinate("48.3794, 31.1656")).toBe(false);
  });

  test('should reject non-array values', () => {
    expect(isValidCoordinate(null)).toBe(false);
    expect(isValidCoordinate(undefined)).toBe(false);
    expect(isValidCoordinate({})).toBe(false);
    expect(isValidCoordinate(123)).toBe(false);
  });

  test('should reject arrays with wrong length', () => {
    expect(isValidCoordinate([48.3794])).toBe(false);
    expect(isValidCoordinate([48.3794, 31.1656, 100])).toBe(false);
    expect(isValidCoordinate([])).toBe(false);
  });

  test('should reject arrays with non-number values', () => {
    expect(isValidCoordinate(["48.3794", "31.1656"])).toBe(false);
    expect(isValidCoordinate([48.3794, "31.1656"])).toBe(false);
    expect(isValidCoordinate(["48.3794", 31.1656])).toBe(false);
  });
});

describe('isValidZoom', () => {
  test('should accept valid zoom level 6', () => {
    expect(isValidZoom(6)).toBe(true);
  });

  test('should accept zoom levels at boundaries', () => {
    expect(isValidZoom(1)).toBe(true);
    expect(isValidZoom(20)).toBe(true);
  });

  test('should reject NaN zoom level', () => {
    expect(isValidZoom(NaN)).toBe(false);
  });

  test('should reject negative zoom level -1', () => {
    expect(isValidZoom(-1)).toBe(false);
    expect(isValidZoom(-10)).toBe(false);
  });

  test('should reject zoom level 0', () => {
    expect(isValidZoom(0)).toBe(false);
  });

  test('should reject zoom level out of bounds 25', () => {
    expect(isValidZoom(25)).toBe(false);
    expect(isValidZoom(21)).toBe(false);
    expect(isValidZoom(100)).toBe(false);
  });

  test('should reject non-number values', () => {
    expect(isValidZoom("6")).toBe(false);
    expect(isValidZoom(null)).toBe(false);
    expect(isValidZoom(undefined)).toBe(false);
    expect(isValidZoom({})).toBe(false);
    expect(isValidZoom([])).toBe(false);
  });
});

describe('validateRegionConfig', () => {
  test('should validate all regions from REGION_CONFIG without throwing errors', () => {
    // Mock console methods to capture output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    const logMessages: string[] = [];
    const errorMessages: string[] = [];
    const warnMessages: string[] = [];
    
    console.log = jest.fn((...args) => logMessages.push(args.join(' ')));
    console.error = jest.fn((...args) => errorMessages.push(args.join(' ')));
    console.warn = jest.fn((...args) => warnMessages.push(args.join(' ')));
    
    // This should not throw
    expect(() => validateRegionConfig()).not.toThrow();
    
    // Should have success message if no errors
    const hasErrors = errorMessages.length > 0;
    if (!hasErrors) {
      expect(logMessages.some(msg => msg.includes('✅'))).toBe(true);
    }
    
    // Restore console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  });

  test('should pass validation for current REGION_CONFIG', () => {
    // Check all regions have valid config
    const regions = Object.keys(REGION_CONFIG);
    
    expect(regions.length).toBeGreaterThan(0);
    
    regions.forEach(region => {
      const config = REGION_CONFIG[region as keyof typeof REGION_CONFIG];
      expect(isValidCoordinate(config.center)).toBe(true);
      expect(isValidZoom(config.zoom)).toBe(true);
    });
  });

  test('should validate specific regions individually', () => {
    // Test a few specific regions
    const odesa = REGION_CONFIG['Odesa'];
    expect(isValidCoordinate(odesa.center)).toBe(true);
    expect(isValidZoom(odesa.zoom)).toBe(true);

    const kyiv = REGION_CONFIG['Kyiv'];
    expect(isValidCoordinate(kyiv.center)).toBe(true);
    expect(isValidZoom(kyiv.zoom)).toBe(true);

    const all = REGION_CONFIG['All'];
    expect(isValidCoordinate(all.center)).toBe(true);
    expect(isValidZoom(all.zoom)).toBe(true);
  });
});
