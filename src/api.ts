import useSWR from 'swr';

// # getAll { page, limit }
//   - https://api.artic.edu/api/v1/artworks?limit=2
// # getById { id }
//   - https://api.artic.edu/api/v1/artworks/4
// # search { q }
//   - https://api.artic.edu/api/v1/artworks/search?q=monet

const baseURL = 'https://api.artic.edu/api/v1/';
const fetcher = (args: string) => fetch(args).then((res) => res.json());

export const useGetAll = (params: { limit: number; page: number }) => {
  const url = [baseURL, 'artworks?', stringifyParams(params)].join('');
  console.log({ url });
  return useSWR<{ data: Artwork[]; config: Config }>(url, fetcher);
};

export const useGetById = (id: string) => {
  const url = [baseURL, 'artworks/', id].join('');
  console.log({ url });
  return useSWR(url, fetcher);
};

export const useSearch = (q: string) => {
  const url = [baseURL, 'artworks/search?', stringifyParams({ q })].join('');
  console.log({ url });
  return useSWR(url, fetcher);
};

// UTILS

// Stringify Params as in { page: 1, limit: 10 } => page=1&limit=10
function stringifyParams(params: Record<string, string | number>) {
  return Object.entries(params)
    .map(([k, v]) => k + '=' + v)
    .join('&');
}

// TYPES

export type ApiError = {
  detail: string;
  error: string;
  status: number;
};

type Config = {
  iiif_url: string;
  website_url: string;
};

type Thumbnail = {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
};

export type Artwork = {
  id: number;
  title: string;
  image_id: string;
  thumbnail: Thumbnail | null;
};
