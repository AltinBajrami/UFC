module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'altin.bajrami66@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
};
