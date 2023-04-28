/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    REACT_APP_API_URL: 'https://localhost:3000/api',
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
