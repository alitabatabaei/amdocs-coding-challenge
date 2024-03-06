import { useParams } from 'react-router-dom';

const ArtworkDetails = () => {
  const { id } = useParams();
  return <h1 className="text-2xl">ArtworkDetails {id}</h1>;
};

export default ArtworkDetails;
