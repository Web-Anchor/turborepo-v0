import { twMerge } from 'tailwind-merge';

export function classNames(...classes: (string | undefined)[]): string {
  // --------------------------------------------------------------------------------
  // 📌  Tailwind css merge handler
  // --------------------------------------------------------------------------------
  const merged = classes?.filter(Boolean).join(' ');

  return twMerge(merged);
}

export function objKeysToNumber(
  keys: (string | undefined)[],
  obj: { [key: string]: any }
): object {
  try {
    if (!Array.isArray(keys) || typeof obj !== 'object' || obj === null) {
      throw new Error('Invalid arguments: Expected an array and an object.');
    }

    return Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        acc[key] = keys.includes(key) ? Number(obj[key]) || 0 : obj[key];
        return acc;
      },
      {}
    );
  } catch {
    return obj;
  }
}

/**
 * Filters the form data object by an array of keys.
 * @param {Object} formData - The form data object.
 * @param {string[]} keysToExtract - Array of keys to extract.
 * @returns {Object} An object containing only the matching key/value pairs.
 */
export function filterFormObject(
  data: { [key: string]: any },
  keysToExtract: string[]
): object {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid arguments: Expected an object.');
    }
    return keysToExtract.reduce(
      (result: { [key: string]: any }, key: string) => {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          result[key] = data[key];
        }
        return result;
      },
      {}
    );
  } catch (error) {
    console.error(error);
    return data;
  }
}
