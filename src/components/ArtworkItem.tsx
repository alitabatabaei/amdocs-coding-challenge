import { Artwork } from '@/api';
import { Card, CardContent, CardHeader } from './ui/card';
import { artworkImageUrl, cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const ArtworkItem = ({ thumbnail: thumb, title, image_id, imageBase }: Props) => {
  const imageUrl = artworkImageUrl(image_id, imageBase, thumb);
  return (
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
  );
};

type Props = Artwork & { imageBase: string };

export default ArtworkItem;
