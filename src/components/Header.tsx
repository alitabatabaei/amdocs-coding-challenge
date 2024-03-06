import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import SearchBox from './SearchBox';

const Header = ({ back, query }: Props) => {
  const handleBack = () => {
    // window.location.href = `/`;
    window.history.back();
  };
  return (
    <div className="flex justify-between mb-4">
      {back ? (
        <Button size="icon" variant="outline" onClick={handleBack}>
          <ChevronLeft />
        </Button>
      ) : (
        <span />
      )}
      <SearchBox value={query} />
    </div>
  );
};

type Props = {
  back?: boolean;
  query?: string;
};

export default Header;
