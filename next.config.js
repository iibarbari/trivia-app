/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));

    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    return config;
  },
}

module.exports = nextConfig
