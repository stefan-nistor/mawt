var mongoose = require('mongoose')

var data = {}

class DatabaseAPI {
    constructor(dbUrl, dbName) {
        mongoose.connection.on('error', function() {
            console.error.bind(console, 'MongoDB connection error: ')
            data.connection.status = false
        })

        data.status = true
        mongoose.connect(dbUrl, { useNewUrlParser: true })
        data.connection = mongoose.connection.db(dbName)
    }

    isUp() {
        return data.connection.status
    }

    find(collection, query) {
        if (this.isUp()) {
            data.connection.collection(collection).find(query).toArray(function(err, result) {
                if (err) throw err
                return result
            })
        }

        return []
    }

    delete(collection, query) {
        if (this.isUp()) {
            data.connection.collection(collection).deleteOne(query, function(err, obj) {
                if (err) throw err
                console.log(obj + ' \nwas deleted')
                return true
            })
        }

        return false
    }

    insert(collection, obj) {
        if (this.isUp()) {
            data.connection.collection(collection).insertOne(obj, function(err, res) {
                if (err) throw err
                console.log(obj + '\nwas inserted')
                return true
            })
        }

        return false
    }

    createCollection(collection) {
        if (this.isUp()) {
            data.connection.createCollection(collection, function(err, res) {
                if (err) throw err
                console.log('Collection ' + collection + ' was created')
                return true
            })
        }

        return false
    }

    dropCollection(collection) {
        if (this.isUp()) {
            data.connection.collection(collection).drop(function(err, delOK) {
                if (err) throw err
                if (delOK) {
                    console.log('Collection ' + collection + ' was deleted')
                    return true
                }
            })
        }

        return false
    }

    closeConnection() {
        if (this.isUp()) {
            data.connection.status = false
            data.connection.close()
            return true
        }

        return false
    }
}

module.exports = new DatabaseAPI()