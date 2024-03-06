import { Artwork } from '@/api';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function artworkImageUrl(id: string, baseUrl: string, thumb: Artwork['thumbnail']) {
  if (!thumb) return;
  const width = Math.min(thumb.width, 400);
  return [baseUrl, '/', id, '/full/', width, ',/0/default.jpg'].join('');
}
