/** @type {import('next').NextConfig} */
const nextConfig = {
    images  : { domains: [
        'm.media-amazon.com',
        'images-na.ssl-images-amazon.com',
        'external-content.duckduckgo.com',
        'cdn2.penguin.com.au',
        'i.harperapps.com',
        'media.shortform.com'] },
    webpack: (config, { isServer }) => {
        if (isServer) {
        config.resolve.alias['canvas'] = false;
        }
        return config;
    },
};

export default nextConfig;
