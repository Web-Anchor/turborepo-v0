export function dateToFormattedString(date?: string) {
  try {
    if (!date) {
      throw new Error('Invalid date');
    }
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (err) {
    return (err as Error)?.message || 'Invalid date';
  }
}
