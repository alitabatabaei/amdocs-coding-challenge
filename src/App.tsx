import { useGetAll } from './api';

function App() {
  const pagination = { page: '2', limit: '1' };

  const { data, error, isLoading } = useGetAll(pagination);

  if (isLoading) return 'loading';
  if (error) return 'Error!';

  if (!data) return 'Loading...';
  console.log(data);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
