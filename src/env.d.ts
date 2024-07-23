/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // tambahkan variabel lingkungan lainnya di sini jika ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
