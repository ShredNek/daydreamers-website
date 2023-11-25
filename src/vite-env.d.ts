/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_ADMIN_API_TOKEN: string;
  readonly VITE_SHOPIFY_API_KEY: string;
  readonly VITE_SHOPIFY_SECRET_KEY: string;
  readonly VITE_SHOPIFY_SCOPES: string;
  readonly VITE_SHOPIFY_STORE_NAME: string;
  readonly VITE_SHOPIFY_MIDDLEWEAR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
