
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mail: {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT, 10),
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
    },
})
