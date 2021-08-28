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
      manifest: {},
      workbox: {},
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
