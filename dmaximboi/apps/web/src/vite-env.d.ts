/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DASHBOARD_PIN?: string
  readonly VITE_SHEET_ID?: string
  readonly VITE_SHEETS_API_KEY?: string
  readonly VITE_SHEETS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
