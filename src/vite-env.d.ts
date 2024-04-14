/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_ADMIN_API_TOKEN: string;
  readonly VITE_SHOPIFY_API_KEY: string;
  readonly VITE_SHOPIFY_SECRET_KEY: string;
  readonly VITE_SHOPIFY_SCOPES: string;
  readonly VITE_SHOPIFY_STORE_NAME: string;
  readonly VITE_SHOPIFY_BUY_CLIENT_TOKEN: string;
  readonly VITE_SHOPIFY_SHOP_DOMAIN: string;
  readonly VITE_SHOPIFY_MIDDLEWEAR_URL: string;
  readonly VITE_DATO_GRAPHQL_ENDPOINT: string;
  readonly VITE_DATO_GRAPHQL_READONLY_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
