declare namespace NodeJS {
  interface AppEnv {
    PORT: number;
    LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  }

  interface ProcessEnv extends AppEnv {}
}
