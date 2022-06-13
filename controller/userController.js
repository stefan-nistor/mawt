var { ObjectId } = require('mongodb')

module.exports.getAll = async(req, res) => {
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

module.exports.postMethod = async(req, res) => {
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
                res.write(JSON.stringify({ success: true, message: 'CREATED' }))
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

module.exports.updateUser = async(req, res) => {

    try {
        let arr = []
        arr = req.url.split('/')
        let id = arr[arr.length - 1]
        id = id.padStart(12 - id.length + 1, '0')
        console.log(id)
        const user = await req.db.User.findOne({ _id: id })

        if (user) {
            const userUpdate = await req.db.User.updateOne({ _id: id }, { $set: { email: req.body.email } })

            res.statusCode = 205
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: true, userUpdate, message: 'UPDATED' }))
            res.end()
        } else {
            res.statusCode = 404
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no user with this id' }))
            res.end()
        }
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
    }
}

module.exports.deleteUser = async(req, res) => {

    try {
        let arr = []
        arr = req.url.split('/')
        let id = arr[arr.length - 1]
        id = id.padStart(12 - id.length + 1, '0')
        console.log(id)
        const user = await req.db.User.findOne({ _id: id })

        if (user) {
            await req.db.User.remove({ _id: id })

            res.statusCode = 205
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: true, msg: "removed user", message: 'DELETED' }))
            res.end()
        } else {
            res.statusCode = 404
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no user with this id' }))
            res.end()
        }
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal Server error!' }))
        res.end()
    }
}