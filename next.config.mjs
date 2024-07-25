/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lint-cdn.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
