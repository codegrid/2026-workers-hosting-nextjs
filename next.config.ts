import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // 静的エクスポートではサーバー側の画像最適化が使えないため無効にする
    unoptimized: true,
  },
};

export default nextConfig;
