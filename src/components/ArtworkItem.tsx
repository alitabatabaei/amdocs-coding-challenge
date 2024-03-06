import { Artwork } from '@/api';
import { Card, CardContent, CardHeader } from './ui/card';
import { artworkImageUrl, cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Link } from 'react-router-dom';

const ArtworkItem = ({ id, title, thumbnail, image_id, imageBase }: Props) => {
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
          <h2 className="text-lg font-bold">{title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
};

type Props = Artwork & { imageBase: string };

export default ArtworkItem;
