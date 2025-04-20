export const EnvConfiguration = () => ({
  stage: process.env.STAGE || 'dev',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbPassoword: process.env.DB_PASSWORD,
  synchronize: process.env.SYNCHRONIZE,
  port: process.env.PORT || 3000,
  hostApi: process.env.HOST_API,
  jwtSecret: process.env.JWT_SECRET || 'p3rs0n4al4cc0unt',
});
