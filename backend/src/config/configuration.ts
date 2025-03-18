
export default () => ({
   port: parseInt(process.env.PORT, 10) || 3000,
   jwt: {
    access: process.env.JWT_ACCESS_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
   },
   database: {
     url: process.env.DATABASE_URL,
   },
 });