import useSWR from 'swr';

// # getAll { page, limit }
//   - https://api.artic.edu/api/v1/artworks?limit=2
// # getById { id }
//   - https://api.artic.edu/api/v1/artworks/4
// # search { q }
//   - https://api.artic.edu/api/v1/artworks/search?q=monet

const baseURL = 'https://api.artic.edu/api/v1/';
const fetcher = (args: string) => fetch(args).then((res) => res.json());

export const useGetAll = (params: Pagination) => {
  const url = [baseURL, 'artworks?', new URLSearchParams(params).toString()].join('');
  console.log({ url });
  return useSWR(url, fetcher);
};

export const useGetById = (id: string) => {
  const url = [baseURL, 'artworks/', id].join('');
  console.log({ url });
  return useSWR(url, fetcher);
};

export const useSearch = (q: string) => {
  const url = [baseURL, 'artworks/search?', new URLSearchParams({ q }).toString()].join('');
  console.log({ url });
  return useSWR(url, fetcher);
};

// TYPES

export type ApiError = {
  detail: string;
  error: string;
  status: number;
};

type Pagination = {
  limit: string;
  page: string;
};