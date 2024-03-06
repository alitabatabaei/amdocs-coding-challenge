import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtworkListPage from '@/components/ArtworkListPage';
import ArtworkDetails from '@/components/ArtworkDetails';
import SearchResultsPage from './components/SearchResultsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ArtworkListPage />,
  },
  {
    path: '/:id',
    element: <ArtworkDetails />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
]);

function App() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
