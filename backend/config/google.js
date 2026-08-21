const { OAuth2Client } = require("google-auth-library");

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is missing");
}

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

module.exports = client;