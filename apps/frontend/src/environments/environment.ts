// environment.ts

export type AppEnv = 'development' | 'production' | 'local' | 'qa';

declare global {
  interface Window {
    env?: {
      VITE_APP_ENV?: AppEnv;
      VITE_APP_BACKEND_VS_URL?: string;
    };
  }
}

// 1. Build-time environment from Vite
const buildEnv = {
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV as AppEnv,
  VITE_APP_BACKEND_VS_URL: import.meta.env.VITE_APP_BACKEND_VS_URL,
} as const;

// 2. If window.env is loaded and not a placeholder, use that runtime value:
function getEffectiveEnv() {
  if (
    window?.env?.VITE_APP_BACKEND_VS_URL &&
    window.env.VITE_APP_BACKEND_VS_URL !== '__VITE_APP_BACKEND_VS_URL__'
  ) {
    return window.env;
  }
  return buildEnv;
}

export const environment = {
  app: {
    appEnv: getEffectiveEnv().VITE_APP_ENV || 'local',
    backendUrl: getEffectiveEnv().VITE_APP_BACKEND_VS_URL || 'http://localhost:4000',
  },
};