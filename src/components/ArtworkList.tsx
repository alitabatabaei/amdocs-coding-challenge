import { useGetAll } from '@/api';
import ArtworkItem from '@/components/ArtworkItem';
import { useSearchParams } from 'react-router-dom';
import ArtworkPagination from './ArtworkPagination';

const limit = 12;

const ArtworkList = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, error, isLoading } = useGetAll({ page, limit });

  if (isLoading) return 'loading';
  if (error) return 'Error!';

  if (!data) return 'Loading...';

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto p-4">
        {data.data.map((art) => (
          <ArtworkItem key={art.id} imageBase={data.config.iiif_url} {...art} />
        ))}
      </div>
      <ArtworkPagination {...data.pagination} />
    </>
  );
};

export default ArtworkList;
