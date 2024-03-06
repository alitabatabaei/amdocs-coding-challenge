import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ value }: Props) => {
  const [query, setQuery] = useState(value || '');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${query}&page=1`);
  };
  return (
    <form
      id="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-60 md:max-w-sm items-center space-x-2"
    >
      <Input type="search" placeholder="Search..." value={query} onChange={handleChange} />
      <Button type="submit" size="icon">
        <Search />
      </Button>
    </form>
  );
};

type Props = {
  value?: string;
};

export default SearchBox;
