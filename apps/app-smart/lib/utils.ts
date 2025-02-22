import { twMerge } from 'tailwind-merge';

export function classNames(...classes: (string | undefined)[]): string {
  // --------------------------------------------------------------------------------
  // 📌  Tailwind css merge handler
  // --------------------------------------------------------------------------------
  const merged = classes?.filter(Boolean).join(' ');

  return twMerge(merged);
}
