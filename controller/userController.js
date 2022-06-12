var { ObjectId } = require('mongodb')

module.exports.getAll = async (req, res) => {
    try {
        const users = await req.db.User.find()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: true, users, message: 'OK' }))
        res.end()
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
    }
}
 
module.exports.postMethod = async (req, res) => {
    try {
        console.log(req.body)
        const user = new req.db.User(req.body.element)

        user.save((err) => {
            if (err) {
                console.log(err)
                res.statusCode = 500
                res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
                res.end()
            } else {
                res.statusCode = 201
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ success: true, message: 'CREATED'}))
                res.end()
            }
        })
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
    }
}
    