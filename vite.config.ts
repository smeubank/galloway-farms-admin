/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import dns from "dns"
import path from "path"
import { env } from "process"
// import { defineConfig } from "vite"
import { defineConfig, loadEnv } from "vite"
import { sentryVitePlugin } from "@sentry/vite-plugin";

// Resolve localhost for Node v16 and older.
// @see https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder("verbatim")

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
      outDir: "public",
    },
    plugins: [
      react(),
      sentryVitePlugin({
        org: "steven-eubank",
        project: "galloway-farms-admin",
        include: "./dist",
        authToken: env.SENTRY_AUTH_TOKEN || "",
        // Optionally uncomment the line below to override automatic release name detection
        // release: env.RELEASE,
      }),
    ],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      api: 7001,
    },
    // Backwards-compat with Gatsby.
    publicDir: "static",
    resolve: {
      alias: {
        gatsby: path.resolve(__dirname, "src/compat/gatsby-compat.tsx"),
        "@reach/router": path.resolve(
          __dirname,
          "src/compat/reach-router-compat.tsx"
        ),
      },
    },
    define: {
      __MEDUSA_BACKEND_URL__: JSON.stringify(
        env.MEDUSA_BACKEND_URL ||
        // Backwards-compat with Gatsby.
        env.GATSBY_MEDUSA_BACKEND_URL ||
        env.GATSBY_STORE_URL ||
        ""
      ),
      __SENTRY_DSN__: JSON.stringify(
        env.SENTRY_DSN ||
        ""
      ),
      __SENTRY_DEBUG__: JSON.stringify(
        env.__SENTRY_DEBUG__ ||
        ""
      ),
    },
    optimizeDeps: {
      exclude: ["typeorm", "medusa-interfaces"],
    },
  } 
});
