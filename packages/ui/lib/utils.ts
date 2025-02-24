import { format } from 'date-fns';

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
