const { isNullOrUndefined } = require('util')
const { composeDatabase, collectParameters, isAuth, collectBody } = require('../middlewares/payloadValidation')
const anythingButSlashRegex = '([0-9]|[a-z]|[A-Z])+'

String.prototype.fullMatch = function(regex) {
    try {
        regex = new RegExp(regex)
    } catch (e) {
        return false
    }
    var matches = this.toString().match(regex)
    if (matches) {
        if (matches[0] === matches.input) {
            return true
        }
    }
    return false
}

class Router {
    constructor() {
        this.getRoutes = {}
        this.postRoutes = {}
        this.putRoutes = {}
        this.deleteRoutes = {}
    }


    use(url, router) {
        let el
        for (el in router.getRoutes) {
            this.getRoutes[url + el] = router.getRoutes[el]
        }
        for (el in router.putRoutes) {
            this.putRoutes[url + el] = router.putRoutes[el]
        }
        for (el in router.postRoutes) {
            this.postRoutes[url + el] = router.postRoutes[el]
        }
        for (el in router.deleteRoutes) {
            this.deleteRoutes[url + el] = router.deleteRoutes[el]
        }
    }

    get(url, controller) {
        this.getRoutes[url] = controller
    }

    put(url, controller) {
        this.putRoutes[url] = controller
    }

    post(url, controller) {
        this.postRoutes[url] = controller
    }

    delete(url, controller) {
        this.deleteRoutes[url] = controller
    }


    route(req, res) {
        var url = req.url.split('?')[0]

        if (req.method === 'GET') {
            for (const routeKey of Object.keys(this.getRoutes)) {
                let urlRegex = ''
                const pathParams = {}
                routeKey.split('/').forEach((val, idx) => {
                    if (idx !== 0) {
                        if (val.startsWith(':')) {
                            pathParams[val.slice(1)] = null
                            urlRegex = `${urlRegex}/(?<${val.slice(1)}>${anythingButSlashRegex})`
                        } else {
                            urlRegex = `${urlRegex}/${val}`
                        }
                    }
                })

                if (url.fullMatch(urlRegex)) {
                    req.pathParams = url.match(urlRegex)
                    isAuth(req, res, [composeDatabase, collectParameters, this.getRoutes[routeKey]])
                    return
                }
            }

            res.statusCode = 404
            res.write(JSON.stringify({ success: false, message: 'Not found' }))
            res.end()
        }

        if (req.method === 'POST') {
            for (const routeKey of Object.keys(this.postRoutes)) {
                let urlRegex = ''
                const pathParams = {}
                routeKey.split('/').forEach((val, idx) => {
                    if (idx != 0) {
                        if (val.startsWith(':')) {
                            pathParams(val.slice[1]) = null
                            urlRegex = `${urlRegex}/(?<${val.slice[1]}>${anythingButSlashRegex})`
                        } else {
                            urlRegex = `${urlRegex}/${val}`
                        }
                    }
                })
                if (url.fullMatch(urlRegex)) {
                    req.pathParams = url.match(urlRegex)
                    isAuth(req, res, [collectBody, composeDatabase, collectParameters, this.postRoutes[routeKey]])
                    return
                }
            }
            res.statusCode = 400
            res.write(JSON.stringify({ success: false, message: 'bad request' }))
            res.end()
        }

        if (req.method === 'PUT') {
            for (const routeKey of Object.keys(this.putRoutes)) {
                let urlRegex = ''
                const pathParams = {}
                routeKey.split('/').forEach((val, idx) => {
                    if (idx !== 0) {
                        if (val.startsWith(':')) {
                            pathParams[val.slice(1)] = null
                            urlRegex = `${urlRegex}/(?<${val.slice(1)}>${anythingButSlashRegex})`
                        } else {
                            urlRegex = `${urlRegex}/${val}`
                        }
                    }
                })
                if (url.fullMatch(urlRegex)) {
                    req.pathParams = url.match(urlRegex)
                    isAuth(req, res, [collectBody, composeDatabase, collectParameters, this.putRoutes[routeKey]])
                    return
                }
            }
            res.statusCode = 404
            res.write(JSON.stringify({ success: false, message: 'not found' }))
            res.end()
        }

        if (req.method === 'DELETE') {
            for (const routeKey of Object.keys(this.deleteRoutes)) {
                let urlRegex = ''
                const pathParams = {}
                routeKey.split('/').forEach((val, idx) => {
                    if (idx !== 0) {
                        if (val.startsWith(':')) {
                            pathParams[val.slice(1)] = null
                            urlRegex = `${urlRegex}/(?<${val.slice(1)}>${anythingButSlashRegex})`
                        } else {
                            urlRegex = `${urlRegex}/${val}`
                        }
                    }
                })
                if (url.fullMatch(urlRegex)) {
                    req.pathParams = url.match(urlRegex)
                    isAuth(req, res, [collectBody, composeDatabase, collectParameters, this.deleteRoutes[routeKey]])
                    return
                }
            }
            res.statusCode = 404
            res.write(JSON.stringify({ success: false, message: 'not found' }))
            res.end()
        }
    }
}

module.exports = { Router }