import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const getCache = ({ name, pattern }: any) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        runtimeCaching: [
          getCache({
            pattern: /http:\/\/localhost:(.*)\/location\?latitude=([0-9]*[.])?[0-9]+&longitude=([0-9]*[.])?[0-9]+/,
            name: "places-nearby",
          }),
        ],
      },
    }),
  ],
});
