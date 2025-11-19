import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortByDateDesc<T extends { metadata: { date?: string } }>(
  list: T[]
): T[] {
  return [...list].sort((a, b) => {
    const da = a.metadata.date
      ? new Date(a.metadata.date).getTime()
      : Number.NEGATIVE_INFINITY;

    const db = b.metadata.date
      ? new Date(b.metadata.date).getTime()
      : Number.NEGATIVE_INFINITY;

    return db - da; // DESC
  });
}
