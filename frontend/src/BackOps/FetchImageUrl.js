import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
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
