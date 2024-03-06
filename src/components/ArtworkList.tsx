import { useGetAll } from '@/api';
import ArtworkItem from '@/components/ArtworkItem';
import ArtworkPagination from './ArtworkPagination';

const ArtworkList = ({ data, config, pagination }: Props) => {
  if (!data) return null;
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((art) => (
          <ArtworkItem key={art.id} imageBase={config.iiif_url} {...art} />
        ))}
      </div>
      <ArtworkPagination {...pagination} />
    </>
  );
};

type Props = NonNullable<Awaited<ReturnType<typeof useGetAll>>['data']>;

export default ArtworkList;
