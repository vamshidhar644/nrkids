import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-20',
});


