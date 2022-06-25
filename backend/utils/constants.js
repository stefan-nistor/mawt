require('dotenv').config()

const weatherTypes = {
    NORMAL: 0,
    SUNNY: 1,
    CLOUDY: 2,
    RAINY: 3,
    SNOWY: 4,
    STORMY: 5,
    THUNDER: 6,
    WINDY: 7
}
Object.freeze(weatherTypes)

const soilTypes = {
    NORMAL: 0,
    CLAY: 1,
    SANDY: 2,
    CHALKY: 3,
}
Object.freeze(soilTypes)

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
    },
    weatherTypes: weatherTypes,
    soilTypes: soilTypes
}