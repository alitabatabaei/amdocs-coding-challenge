import { Artwork } from '@/api';

export default function ArtImage({ id, baseUrl, thumb }: Props) {
  if (!thumb) return null;
  const width = Math.min(thumb.width, 1200);
  const url = [baseUrl, '/', id, '/full/', width, ',/0/default.jpg'].join('');
  return <img src={url} width={width} alt={thumb.alt_text} className="rounded-md object-cover" />;
}

type Props = {
  id: string;
  baseUrl: string;
  thumb: Artwork['thumbnail'];
};
