// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    compress({
      // Disabled: astro-compress's CSS minifier (csso) strips Tailwind v4's
      // range media queries (`@media (width>=48rem)`), which removes every
      // sm:/md:/lg: breakpoint and forces the mobile layout everywhere.
      // Vite already minifies CSS during the build.
      CSS: false,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],

  build: {
    inlineStylesheets: "auto",
    assets: "assets",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/astro")) return "vendor";
          },
        },
      },
    },
  },
});
