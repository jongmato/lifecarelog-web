// OpenNext config for Cloudflare Workers deployment.
// Docs: https://opennext.js.org/cloudflare/config
import { defineCloudflareConfig } from '@opennextjs/cloudflare'

export default defineCloudflareConfig({
  // Default config uses in-memory cache and the Workers runtime.
  // Extend here if you need KV/R2-backed ISR, tag cache, or queue revalidation.
})
