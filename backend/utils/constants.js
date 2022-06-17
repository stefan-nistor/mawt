module.exports = {
    port: 3000,
    hostUrl: 'http://localhost:3000',
    db_url: 'mongodb+srv://admin:admin@mawt.0d0jq.mongodb.net/mawt?retryWrites=true&w=majority',
    secret: 'ana_are_mere',
    rounds: 5,
    cors_headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Max-Age": 2592000,
        "Content-type": "application/json"
    }
}