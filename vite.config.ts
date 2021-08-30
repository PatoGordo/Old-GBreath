import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import svgLoader from "vite-svg-loader";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./src/i18n/locales/**"),
    }),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    VitePWA({
      manifest: {
        theme_color: "#2DFFC5",
        background_color: "#FFFFFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "GBreath",
        short_name: "GBreath",
        description:
          "GBreath is an open-source project to help you with your breathing practice.",
        icons: [
          {
            src: "/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/images/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {},
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
