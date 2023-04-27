/** @type {import('next').NextConfig} */
const dotenv = require('dotenv-webpack');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new dotenv({ silent: true }));
    return config;
  },
};

module.exports = nextConfig;
