/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        
      },
    ],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.API_URL,
  },
};

export default nextConfig;
