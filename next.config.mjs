/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.sanity.io",
      port: "",
      pathname: "/**",
    },
  ],
};

export default nextConfig;
