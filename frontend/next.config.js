/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['shopping-phinf.pstatic.net'],
  },
  env: {
    REACT_APP_API_URL: 'https://o-nu.com/api',
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
