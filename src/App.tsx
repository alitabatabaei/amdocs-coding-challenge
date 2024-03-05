import { useGetAll } from './api';
import ArtworkItem from './components/ArtworkItem';

function App() {
  const pagination = { page: 2, limit: 10 };

  const { data, error, isLoading } = useGetAll(pagination);

  if (isLoading) return 'loading';
  if (error) return 'Error!';

  if (!data) return 'Loading...';

  return (
    <div className="grid sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto p-4">
      {data.data.map((art) => (
        <ArtworkItem key={art.id} imageBase={data.config.iiif_url} {...art} />
      ))}
    </div>
  );
}

export default App;
