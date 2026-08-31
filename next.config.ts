import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSRに切り替えるため、静的エクスポート向けの設定は削除する
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
