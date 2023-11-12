const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@react-three/drei'],
  distDir: 'dist',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.path = path.join(__dirname, 'dist');
      config.optimization.runtimeChunk = false;
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false,
        },
      };

      config.plugins.push(new HtmlWebpackPlugin({
        filename: path.join(__dirname, 'dist', 'index.html'),
        template: './src/template/index.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: false
      }));
    }

    return config;
  },
};

module.exports = nextConfig;
