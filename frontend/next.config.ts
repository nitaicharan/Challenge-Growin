import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-optimize.toyota-europe.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.seat.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'demo2.nissanflow.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.dealer.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mercedes-benz.pt',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'manobramaximarent.com',
        pathname: '/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  }
};

export default nextConfig;