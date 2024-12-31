// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/oldflag",
        destination: "/flag",
      },
    ];
  },
};
  
module.exports = nextConfig;