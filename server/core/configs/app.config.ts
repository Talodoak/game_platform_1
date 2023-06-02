export const configuration = () => ({
  port: process.env.PORT,
  host: process.env.HOST,
  environment: process.env.NODE_ENV,
  globalAppPrefix: process.env.GLOBAL_APP_PREFIX,
});
