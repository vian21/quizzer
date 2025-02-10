import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NODE_ENV === "production" ? "/quizzer" : "",
  env: {
    NEXT_PUBLIC_BASEPATH:
      process.env.NODE_ENV === "production" ? "/quizzer" : " ",
  },
};

export default nextConfig;
