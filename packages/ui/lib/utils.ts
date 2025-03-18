import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

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

export function classNames(...classes: (string | undefined)[]): string {
  // --------------------------------------------------------------------------------
  // 📌  Tailwind css merge handler
  // --------------------------------------------------------------------------------
  const merged = classes?.filter(Boolean).join(' ');

  return twMerge(merged);
}

export function mergeIf(
  condition: boolean,
  ...classes: (string | undefined)[]
): string {
  return condition ? classNames(...classes) : '';
}
