/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./data/**/*'],
    },
  },
};

export default nextConfig;
