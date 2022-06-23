require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    hostUrl: process.env.HOST_URL,
    db_url: process.env.DB_URL,
    secret: process.env.JWT_SECRET,
    rounds: 5,
    cors_headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Max-Age": 2592000,
        "Content-type": "application/json"
    }
}