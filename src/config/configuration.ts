import 'dotenv/config'

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appUrl: process.env.APP_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
})
