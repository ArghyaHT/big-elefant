// src/lib/sanityClient.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: "tqr4enjo",
  dataset: 'production',            // or your dataset name
  useCdn: true,                     // `false` if you want fresh data always
  apiVersion: '2025-08-05',
  token: "sk4pxhWVyTjxJqY5yihWGlJ8BzQIrjSfbZarFdLhrKCunKO9V42vpiRc5Kk9YPwzFoZtrAUpEwGM5SrFY7ldYYewTLfmnwdM9XmG79UiyY15mSTRSH81QlYtA3Vmc2y5FWG9c4Alz9l460pCS2Etw7mTpSbH3oY0ncYdPSv9sQ7uS6hX2ZqY",
  useCdn: false,             // Set false to ensure fresh data

});
