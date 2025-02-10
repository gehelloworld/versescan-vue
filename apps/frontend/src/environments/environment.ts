// src/environment.ts

export type AppEnv = 'local' | 'development' | 'qa' | 'production';

declare global {
  interface Window {
    env: {
      VITE_APP_ENV: AppEnv;
      VITE_APP_BACKEND_VS_URL: string;
    };
  }
}

const processEnv = {
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV as AppEnv,
  VITE_APP_BACKEND_VS_URL: import.meta.env.VITE_APP_BACKEND_VS_URL,
} as const;

const getEnvVars = () => {
  const determineEnv = () => {
    const isTestEnv = import.meta.env.MODE === 'test';
    const isLocalEnv = processEnv.VITE_APP_ENV === 'local';

    if (isTestEnv || isLocalEnv) {
      return processEnv;
    }
    return window.env;
  };

  const env = determineEnv();

  return {
    app: {
      appEnv: env.VITE_APP_ENV,
      port: 3000,
      backendUrl: env.VITE_APP_BACKEND_VS_URL ?? 'http://localhost:4000',
    },
  };
};

export const environment = getEnvVars();