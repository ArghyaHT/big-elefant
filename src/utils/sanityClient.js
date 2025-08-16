// src/lib/sanityClient.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: "sutdqaze",
  dataset: 'production',            // or your dataset name
  useCdn: true,                     // `false` if you want fresh data always
  apiVersion: '2025-08-05',
  token: "skTSituyKVb24Xi4E0qkanOjWq8NcvLoapBL3WsTVKZ6ZV6GcPVuKX3jFK1vl7MbrJxcUPiNXTizB7Z2ynYyEUOUQFFHunECdUcYkKJ3z470mWzApIGzyB9TbxJaBT63QSnqIWUOtl6di03ScVSPZmSjO1qc1gaZrBvbBO9bbNdd6ID9SMRo",
  useCdn: false,             // Set false to ensure fresh data

});
