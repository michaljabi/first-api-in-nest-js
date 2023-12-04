declare namespace NodeJS {
  interface AppEnv {
    NODE_ENV: 'development' | 'test' | 'production';
    PORT: number;
    LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  }

  interface ProcessEnv extends AppEnv {}
}
