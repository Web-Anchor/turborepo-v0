import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

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

export function getGreeting(date = new Date()) {
  /**
   * Returns a greeting message based on the provided time (or current local time).
   * @param {string} userName - The user's name.
   * @param {Date} [date=new Date()] - Optional Date object. Defaults to current local time.
   * @returns {string} A greeting message.
   * @throws Will throw an error if the provided date is invalid.
   */
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date object provided.');
  }

  // Get the current hour (0-23)
  const hour = date.getHours();
  let greeting;

  // Define greeting based on time of day
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else if (hour >= 18 && hour < 22) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good night';
  }

  return greeting;
}

// csvUtils.ts
export type DownloadCSVOptions = {
  headers: string[];
  data: Record<string, any>[];
  filename?: string;
  separator?: string;
};

export function downloadCSV({
  headers,
  data,
  filename = 'data_list.csv',
  separator = ',',
}: DownloadCSVOptions) {
  // Generate CSV content
  const csvRows: string[] = [];

  // Create header row
  csvRows.push(headers.join(separator));

  // Create each data row with proper escaping:
  data.forEach((item) => {
    const row = Object.values(item)
      .map((value) => {
        // Convert value to string and escape separator if needed.
        const cell = value?.toString() || '';
        return cell.includes(separator) ? `"${cell}"` : cell;
      })
      .join(separator);
    csvRows.push(row);
  });

  const csvContent = csvRows.join('\n');

  // Create a blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function returnIfTruthy(
  condition: boolean,
  value: Record<string, any> | any[]
): Record<string, any> | any[] | undefined {
  return condition ? value : undefined;
}

export function stringCleaner(str?: string): string | undefined {
  try {
    return str?.replace(/_/g, ' ');
  } catch {
    return str;
  }
}

export function mergeIf(
  condition: boolean,
  ...classes: (string | undefined)[]
): string {
  return condition ? classNames(...classes) : '';
}

export function dateToFormattedString(date?: string) {
  try {
    if (!date) {
      throw new Error('Invalid date');
    }
    return format(new Date(date), 'MMM dd, yyyy');
  } catch (err) {
    return (err as Error)?.message || 'Invalid date';
  }
}
