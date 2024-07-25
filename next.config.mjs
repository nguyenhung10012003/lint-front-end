/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lint-cdn.s3.ap-southeast-1.amazonaws.com', 'img.freepik.com'],

  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.API_URL,
  },
};

export default nextConfig;
