export default () => ({
    port: process.env.PORT || 3000,
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
        accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    aws: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: process.env.AWS_BUCKET_NAME,
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    resend: {
        apiKey: process.env.RESEND_API_KEY,
        emailAddress: process.env.RESEND_EMAIL_ADDRESS,
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
    },
    url: {
        client: process.env.CLIENT_URL,
        backend: process.env.BACKEND_URL,
    },
});
