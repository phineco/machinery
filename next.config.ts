import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coresg-normal.trae.ai',
        port: '',
        pathname: '/api/ide/v1/text_to_image/**',
      },
      {
        protocol: 'https',
        hostname: 'q.scyllatech.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082'}/:path*`, // 代理到后端
      },
    ];
  },
};

export default nextConfig;