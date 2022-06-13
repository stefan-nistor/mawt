var { ObjectId } = require('mongodb')

module.exports.getAll = async(req, res) => {
    try {
        const hidroplants = await req.db.Hidroplant.find()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, hidroplants, message: 'OK' }))
        res.end()
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
    }
}