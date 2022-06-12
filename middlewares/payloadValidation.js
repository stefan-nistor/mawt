const { secret } = require('../utils/constants')
const jwt = require('jsonwebtoken')
const url = require('url')
const DB = require('../models/index')

module.exports.isAuth = (req, res, next) => {
    try {
        const url = req.url.split('?')[0]
        if(url.includes('/crud')) {
            try {
                const token = req.headers.authorization.split('Bearer ')[1]
                var obj = jwt.verify(token, secret)

                delete obj.password
                req.user = obj
                next[0](req, res, next.slice[1])
            } catch (e) {
                console.log(e)
                res.writeHead(401, 'application/json')
                res.write(JSON.stringify({ result: false, message: 'Authentication is required' }))
                res.end()
            }
        } else {
            next[0](req, res, next.slice(1))
        }
    } catch (e) {
        console.log(e)
        res.writeHead(500, 'application/json')
        res.write(JSON.stringify({ result: false, message: 'Internal server error!' }))
        res.end()
    }
}

module.exports.collectBody = (req, res, next) => {
    try {
        var data = ''
        req.on('data', (chunk) => {
            try {
                data += chunk
            } catch (e) {
                console.log(e)
                res.writeHead(500, 'aplication/json')
                res.write(JSON.stringify({ result: false, message: 'internal server error' }))
                res.end()
            }
        })

        req.on('end', () => {
            try {
                req.body = JSON.parse(data)
                next[0](req, res, next.slice(1))
            } catch (e) {
                res.writeHead(400, 'application/json')
                res.write(JSON.stringify({ result: false, message: 'Bad request'}))
                res.end()
            }
        })
    } catch (e) {
        console.log(e)
        res.writeHead(500, 'application/json')
        res.write(JSON.stringify({result: false, message: 'internal server error'}))
        res.end()
    }
}

module.exports.composeDatabase = (req, res, next) => {
    try {
      req.db = DB
      next[0](req, res, next.splice(1))
    } catch (e) {
      console.log(e)
      res.writeHead(500, 'aplication/json')
      res.write(JSON.stringify({ result: false, message: 'internal server error' }))
      res.end()
    }
  }
  module.exports.collectParameters = (req, res, next) => {
    try {
      req.params = url.parse(req.url, true).query
      next[0](req, res, next.slice(1))
    } catch (e) {
      console.log(e)
      res.writeHead(500, 'aplication/json')
      res.write(JSON.stringify({ result: false, message: 'internal server error' }))
      res.end()
    }
  }
  
  module.exports.checkBody = (req, res, next, args) => {
    try {
      const payload = req.body
      const schemaToCheck = args[0]
  
      for (const key of Object.keys(schemaToCheck)) {
        if (payload.hasOwnProperty(key)) {
          if (typeof (payload[key]) !== schemaToCheck[key]) {
            return res.status(httpStatus.BAD_REQUEST).json({
              success: false,
              message: 'Bad request'
            })
          }
        }
      }
  
      for (const key of Object.keys(payload)) {
        if (!schemaToCheck.hasOwnProperty(key)) {
          return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Bad request'
          })
        }
      }
  
      next[0](req, res, next.slice(1), args.slice(1))
    } catch (e) {
      console.log(e)
      res.writeHead(500, 'aplication/json')
      res.write(JSON.stringify({ result: false, message: 'internal server error' }))
      res.end()
    }
  }