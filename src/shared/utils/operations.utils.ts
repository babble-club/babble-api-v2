import type { Nullable } from '@/shared/types/global.types';
import AppLogger from '@/shared/utils/app-logger.utils';

export class OperationsUtils {
  private logger;

  constructor() {
    this.logger = new AppLogger(__filename).child({
      filepath: __filename,
    });
  }
  /**
   * Removes specified keys from an object.
   *
   * @param obj The original object.
   * @param keysToRemove An array of keys to remove from the object.
   * @returns A new object with the specified keys removed.
   */
  public removeKeys<T extends object, K extends keyof T>(obj: T, keysToRemove: K[]): Omit<T, K> {
    const newObj = { ...obj }; // Create a shallow copy to maintain immutability
    for (const key of keysToRemove) {
      delete newObj[key];
    }
    return newObj;
  }

  /**
   * Converts a comma-separated string to an array of strings, trimming whitespace from each element.
   *
   * @param str The comma-separated string to convert.
   * @returns An array of strings, or an empty array if the input string is null or empty.
   */
  public commaSeparatedStringToArray(str: Nullable<string>): string[] {
    if (!str) return []; // Handle null or undefined input gracefully
    return str.split(',').map((item) => item.trim());
  }

  public tryParseJson<T extends Record<string, any>>(jsonString: Nullable<string>): T | null {
    if (!jsonString) return null; // Handle null or undefined input
    try {
      const parsed = JSON.parse(jsonString) as T;
      // Basic type check to ensure it's an object (dictionary)
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
      return null; // Not a valid JSON object
    } catch (error) {
      // JSON.parse throws an error if the string is not valid JSON
      this.logger.error('Error parsing JSON:', error); // Log the error for debugging
      return null;
    }
  }

  public tryExtractAndCleanDictionary<T extends Record<string, any>>(
    input: string | null | undefined
  ): T | null {
    if (!input) {
      return null; // Handle null or undefined input
    }

    try {
      // Find the start and end of the outermost dictionary
      const startIndex = input.indexOf('{');
      const endIndex = input.lastIndexOf('}');

      if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        console.error('No valid dictionary found in the input.');
        return null; // No valid dictionary found
      }

      // Extract the outermost dictionary
      const outerDictString = input.substring(startIndex, endIndex + 1);

      // Parse the dictionary string as JSON
      const parsedDict = JSON.parse(outerDictString) as T;

      // Basic type check to ensure it's an object (dictionary)
      if (typeof parsedDict === 'object' && parsedDict !== null) {
        return parsedDict;
      }
      this.logger.error('Parsed value is not a valid dictionary.');
      return null; // Parsed value is not a valid dictionary
    } catch (error: any) {
      // JSON.parse throws an error if the string is not valid JSON
      this.logger.error('Error extracting and cleaning dictionary:', error.message);
      return null; // Parsing failed
    }
  }
}
