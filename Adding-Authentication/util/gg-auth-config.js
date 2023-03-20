require("dotenv").config();

module.exports = {
  user: process.env.GOOGLE_CREDENTIAL_EMAIL,
  clientId: process.env.GOOGLE_CREDENTIAL_CLIENTID,
  clientSecret: process.env.GOOGLE_CREDENTIAL_CLIENTSECRET,
  refreshToken: process.env.GOOGLE_CREDENTIAL_REFRESHTOKEN,
};
