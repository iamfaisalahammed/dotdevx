
import { createWorkersCacheConfig } from "@vinext/cloudflare/cache/config";
import { bindings, defineConfig, defineWorker } from "cf/config";

const cache = await createWorkersCacheConfig();

export default defineConfig({
  worker: defineWorker({
    ...cache,
    name: "dotdevx",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-12",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ...cache.env,
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      NEXT_PUBLIC_SITE_URL: bindings.text("https://dotdevx.com"),
    },
    domains: ["dotdevx.com", "www.dotdevx.com"],
  }),
});
