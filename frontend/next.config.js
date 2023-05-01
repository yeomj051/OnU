/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    REACT_APP_API_URL: 'https://localhost:3000/api',
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
