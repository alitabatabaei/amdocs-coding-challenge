import useSWR from 'swr';

// # getAll { page, limit }
//   - https://api.artic.edu/api/v1/artworks?limit=2
// # getById { id }
//   - https://api.artic.edu/api/v1/artworks/4
// # search { q }
//   - https://api.artic.edu/api/v1/artworks/search?q=monet

const baseURL = 'https://api.artic.edu/api/v1/';
const fetcher = (args: string) =>
  fetch(args)
    .then((res) => res.json())
    .catch((e) => e);

const limit = 12;

export const useGetAll = (params: { page: number }) => {
  const fields = ['id', 'title', 'image_id', 'thumbnail', 'artist_title'].join();
  const url = [baseURL, 'artworks?', stringifyParams({ ...params, limit, fields })].join('');
  return useSWR<
    { data: Artwork[]; config: Config; pagination: PaginationData } & Partial<ApiError>
  >(url, fetcher);
};

export const useGetById = (id = '') => {
  const url = [baseURL, 'artworks/', id].join('');
  return useSWR<{ data: ArtworkDetails; config: Config } & Partial<ApiError>>(url, fetcher);
};

export const useSearch = (params: { q: string; page: number }) => {
  const url = [baseURL, 'artworks/search?', stringifyParams({ ...params, limit })].join('');
  return useSWR<
    { data: SearchResult[]; config: Config; pagination: PaginationData } & Partial<ApiError>
  >(url, fetcher);
};

// UTILS

// Stringify Params as in { page: 1, limit: 10 } => page=1&limit=10
function stringifyParams(params: Record<string, string | number>) {
  return Object.entries(params)
    .map(([k, v]) => k + '=' + v)
    .join('&');
}

// TYPES

type ApiError = {
  detail: string;
  error: string;
  status: number;
};

type Config = {
  iiif_url: string;
  website_url: string;
};

export type PaginationData = {
  current_page: number;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
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
  artist_title: string;
};

export type ArtworkDetails = {
  title: string;
  artist_display: string;
  date_display: string;
  main_reference_number: string;
  thumbnail: Thumbnail | null;
  image_id: string;
  dimensions: string;
};

export type SearchResult = {
  _score: number;
  thumbnail: Thumbnail;
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
  timestamp: string;
};
