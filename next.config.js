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
};

module.exports = nextConfig;
