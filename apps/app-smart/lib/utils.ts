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
