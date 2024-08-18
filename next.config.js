const path = require("path");
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // .envファイルで定義された変数を参照し、ビルド時に利用可能にする
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  images: {
    // Supabaseから画像を取得できるようにremotePatternsを設定
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stbzpjxztwhzlqgsievd.supabase.co", // SupabaseプロジェクトのURLに置き換える
        port: "",
      },
    ],
  },
  /** WebPack の設定を追加 */
  webpack: (config) => {
    // Vue と同じように 「@ = src/」,「~ = src/」に設定する。
    // => モジュールのパス解決とエイリアスを設定している。
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["~"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
