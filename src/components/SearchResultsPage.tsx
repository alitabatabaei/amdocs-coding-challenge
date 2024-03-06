import { useSearch } from '@/api';
import { Link, useSearchParams } from 'react-router-dom';
import Header from './Header';
import ArtworkPagination from './ArtworkPagination';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const q = searchParams.get('q') || '';

  const { data, isLoading } = useSearch({ q, page });

  if (!data || isLoading) return 'loading';
  if (data.error) return data.detail || 'Error!';

  return (
    <>
      <Header back query={q} />
      <div className="flex flex-col divide-y">
        {data.data.map((s) => {
          return (
            <Link key={s.id} to={`/${s.id}`} className="flex items-center py-1 hover:bg-slate-100">
              <div
                className="rounded-sm	bg-cover w-3 h-3 mr-2 bg-slate-200"
                style={{ backgroundImage: s.thumbnail?.lqip && `url(${s.thumbnail.lqip})` }}
              />
              {s.title}
            </Link>
          );
        })}
      </div>
      <ArtworkPagination {...data.pagination} />
    </>
  );
};

export default SearchResultsPage;
