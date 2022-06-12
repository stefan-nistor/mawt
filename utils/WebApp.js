const http = require('http')
const { port } = require('../utils/constants')
const { db_url } = require('../utils/constants')
const mongoose = require('mongoose')

class WebApp {
    constructor (port, router) {
        this.port = port
        this.router = router
    }

    use() {

    }

    async listen () {
        const app = this

        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const server = http.createServer(function (req, res) {
            app.router.route(req, res)
        })
        server.listen(port)
        console.log(`app running on PORT: ${port}`)
        console.log('http://localhost:3000')
    }
}

module.exports = { WebApp }