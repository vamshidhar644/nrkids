import { createClient } from '@sanity/client';

import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
  apiVersion: '2023-05-20',
});

const builder = imageUrlBuilder(client);

const FetchImageUrl = () => {
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  return {
    getImageUrl,
  };
};

export default FetchImageUrl;
