import { Artwork } from '@/api';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { artworkImageUrl, cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Link } from 'react-router-dom';

const ArtworkItem = ({ id, title, thumbnail, image_id, imageBase, artist_title }: Props) => {
  const imageUrl = artworkImageUrl(image_id, imageBase, thumbnail);
  return (
    <Link to={`${id}`}>
      <Card>
        <CardHeader>
          <AspectRatio ratio={1}>
            <div
              className={cn('rounded-md h-full bg-center bg-cover', !imageUrl && 'bg-slate-100')}
              style={{ backgroundImage: imageUrl && `url(${imageUrl})` }}
            />
          </AspectRatio>
        </CardHeader>
        <CardContent>
          <h2 className="text-md font-bold">{ellipsis(title, 50)}</h2>
          <CardDescription>{artist_title}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

function ellipsis(str: string, max: number) {
  if (str.length <= max) return str;
  const trimmed = str.substring(0, max).trim();
  return trimmed + '...';
}

type Props = Artwork & { imageBase: string };

export default ArtworkItem;
