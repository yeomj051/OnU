/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['shopping-phinf.pstatic.net'],
  },
  env: {
    REACT_APP_API_URL: 'https://k8a703.p.ssafy.io/api',
    REACT_APP_KAKAO_URL:
      'https://k8a703.p.ssafy.io/api/oauth2/authorize/kakao?redirect_uri=https://k8a703.p.ssafy.io/user/redirect',
    REACT_APP_TEST_URL:
      'https://k8a703.p.ssafy.io/api/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/user/redirect',
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
