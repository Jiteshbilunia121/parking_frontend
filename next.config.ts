import type { NextConfig } from 'next';



const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
