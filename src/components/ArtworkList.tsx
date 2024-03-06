import { useGetAll } from '@/api';
import ArtworkItem from '@/components/ArtworkItem';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ArtworkList = () => {
  const pagination = { page: 2, limit: 10 };

  const { data, error, isLoading } = useGetAll(pagination);

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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ArtworkList;
