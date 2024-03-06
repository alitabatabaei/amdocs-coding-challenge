import { useGetById } from '@/api';
import { useParams } from 'react-router-dom';
import ArtImage from './ArtImage';
import { CalendarFold, Scaling, ScanBarcode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const ArtworkDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetById(id);

  if (!data || isLoading) return 'loading...';

  console.log(data.data);
  const {
    title,
    artist_display,
    date_display,
    main_reference_number,
    image_id,
    thumbnail,
    dimensions,
  } = data.data;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ArtImage id={image_id} baseUrl={data.config.iiif_url} thumb={thumbnail} />
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{artist_display}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 divide-y text-slate-400">
            <div className="flex flex-row py-2">
              <CalendarFold className="mr-2" />
              {date_display}
            </div>
            <div className="flex flex-row py-2">
              <ScanBarcode className="mr-2" />
              {main_reference_number}
            </div>
            <div className="flex flex-row py-2">
              <Scaling className="mr-2" />
              {dimensions}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtworkDetails;
