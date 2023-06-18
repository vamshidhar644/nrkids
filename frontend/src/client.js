import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-20',
});

export const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-20',
});

