export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    db: {
        host: process.env.NODE_ENV === 'production' ? undefined : process.env.DB_HOST,
        port: process.env.NODE_ENV === 'production' ? undefined : parseInt(process.env.DB_PORT ?? '5432', 10),
        username:  process.env.NODE_ENV === 'production' ? undefined : process.env.DB_USERNAME,
        password: process.env.NODE_ENV === 'production' ? undefined : process.env.DB_PASSWORD,
        name: process.env.NODE_ENV === 'production' ? undefined : process.env.DB_NAME,
        url: process.env.NODE_ENV === 'production' ? process.env.DB_URL : undefined,
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessTtl: process.env.JWT_ACCESS_TTL || '8h',
        refreshTtl: process.env.JWT_REFRESH_TTL || '24h',
    },
});
