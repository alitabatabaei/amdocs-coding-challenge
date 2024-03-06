import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtworkList from '@/components/ArtworkList';
import ArtworkDetails from '@/components/ArtworkDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ArtworkList />,
  },
  {
    path: '/:id',
    element: <ArtworkDetails />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
