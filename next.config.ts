import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ESLintのビルド時エラーを無視
  },
  output: "export",  // 静的エクスポート用の設定（Next.js 13+）
  // 他のconfigオプションがあればここに続けて記述
};

export default nextConfig;
