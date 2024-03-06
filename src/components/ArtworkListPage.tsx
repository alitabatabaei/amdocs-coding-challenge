import { useGetAll } from '@/api';
import { useSearchParams } from 'react-router-dom';
import ArtworkList from './ArtworkList';
import Header from './Header';

const ArtworkListPage = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useGetAll({ page });

  if (!data || isLoading) return 'loading';
  if (data.error) return data.detail || 'Error!';

  return (
    <>
      <Header />
      <ArtworkList {...data} />
    </>
  );
};

export default ArtworkListPage;
