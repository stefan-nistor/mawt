var { ObjectId } = require('mongodb')
var { checkAuth } = require('../auth/checkAuth')

module.exports.getAll = async(req, res) => {
    if (!checkAuth(req, res)) {
        return
    }

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

module.exports.createHidroplant = async(req, res) => {
    if (!checkAuth(req, res)) {
        return
    }

    try {
        if (!req.body.name) {
            console.error('no name error')
            res.statusCode = 400
            res.write(JSON.stringify({ success: false, message: 'name is required' }))
            res.end()
            return
        }

        const hidroplant = await req.db.Hidroplant.findOne({ name: req.body.name })
        if (hidroplant) {
            res.statusCode = 403
            res.write(JSON.stringify({ success: false, messageL: 'name has been taken' }))
            res.end()
        } else {
            const hidroplant_ = new req.db.Hidroplant({
                name: req.body.name,
                db_status: req.body.db_status,
                country: req.body.country,
                iso: req.body.iso,
                reservoir: req.body.reservoir,
                lake: req.body.lake,
                purpose: req.body.purpose,
                admin_unit: req.body.admin_unit,
                owner: req.body.owner,
                near_city: req.body.near_city,
                district: req.body.district,
                river: req.body.river,
                main_basin: req.body.main_basin,
                catch_area: req.body.catch_area,
                op_status: req.body.op_status,
                commisioned: req.body.commisioned,
                dam_completed: req.body.dam_completed,
                no_units: req.body.no_units,
                dam_heigth: req.body.dam_heigth,
                min_wHeadHgt: req.body.min_wHeadHgt,
                max_wHeadHgt: req.body.max_wHeadHgt,
                res_capacity: req.body.res_capacity,
                res_area: req.body.res_area,
                elec_cap: req.body.elec_cap,
                transm_exist: req.body.transm_exist,
                transm_length: req.body.transm_length,
                transm_planned: req.body.transm_planned,
                type: req.body.type,
                ann_firm_gen: req.body.ann_firm_gen,
                ann_total_gen: req.body.ann_total_gen,
                lat_res: req.body.lat_res,
                long_res: req.body.long_res,
                lat_hp1: req.body.lat_hp1,
                long_hp1: req.body.long_hp1,
                lat_hp2: req.body.lat_hp2,
                long_hp2: req.body.long_hp2,
                display: req.body.display,
            })

            hidroplant_.save((err) => {
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
        }
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ success: false, message: 'Internal server error!' }))
        res.end()
    }
}

module.exports.updateHidroplant = async(req, res) => {
    if (!checkAuth(req, res)) {
        return
    }

    try {
        let arr = []
        arr = req.url.split('/')
        let id = arr[arr.length - 1]
        id = id.padStart(12 - id.length + 1, '0')
        const hidroplant = await req.db.Hidroplant.findOne({ _id: id })

        if (hidroplant) {
            const hidroplantUpdate = await req.db.Hidroplant.updateOne({ _id: id }, {
                $set: {
                    name: req.body.name ? req.body.name : hidroplant.name,
                    db_status: req.body.db_status ? req.body.db_status : hidroplant.db_status,
                    country: req.body.country ? req.body.country : hidroplant.country,
                    iso: req.body.iso ? req.body.iso : hidroplant.iso,
                    reservoir: req.body.reservoir ? req.body.reservoir : hidroplant.reservoir,
                    lake: req.body.lake ? req.body.lake : hidroplant.lake,
                    purpose: req.body.purpose ? req.body.purpose : hidroplant.purpose,
                    admin_unit: req.body.admin_unit ? req.body.admin_unit : hidroplant.admin_unit,
                    owner: req.body.owner ? req.body.owner : hidroplant.owner,
                    near_city: req.body.near_city ? req.body.near_city : hidroplant.near_city,
                    district: req.body.district ? req.body.district : hidroplant.district,
                    river: req.body.river ? req.body.river : hidroplant.river,
                    main_basin: req.body.main_basin ? req.body.main_basin : hidroplant.main_basin,
                    catch_area: req.body.catch_area ? req.body.catch_area : hidroplant.catch_area,
                    op_status: req.body.op_status ? req.body.op_status : hidroplant.op_status,
                    commisioned: req.body.commisioned ? req.body.commisioned : hidroplant.commisioned,
                    dam_completed: req.body.dam_completed ? req.body.dam_completed : hidroplant.dam_completed,
                    no_units: req.body.no_units ? req.body.no_units : hidroplant.no_units,
                    dam_heigth: req.body.dam_heigth ? req.body.dam_heigth : hidroplant.dam_heigth,
                    min_wHeadHgt: req.body.min_wHeadHgt ? req.body.min_wHeadHgt : hidroplant.min_wHeadHgt,
                    max_wHeadHgt: req.body.max_wHeadHgt ? req.body.max_wHeadHgt : hidroplant.max_wHeadHgt,
                    res_capacity: req.body.res_capacity ? req.body.res_capacity : hidroplant.res_capacity,
                    res_area: req.body.res_area ? req.body.res_area : hidroplant.res_area,
                    elec_cap: req.body.elec_cap ? req.body.elec_cap : hidroplant.elec_cap,
                    transm_exist: req.body.transm_exist ? req.body.transm_exist : hidroplant.transm_exist,
                    transm_length: req.body.transm_length ? req.body.transm_length : hidroplant.transm_length,
                    transm_planned: req.body.transm_planned ? req.body.transm_planned : hidroplant.transm_planned,
                    type: req.body.type ? req.body.type : hidroplant.type,
                    ann_firm_gen: req.body.ann_firm_gen ? req.body.ann_firm_gen : hidroplant.ann_firm_gen,
                    ann_total_gen: req.body.ann_total_gen ? req.body.ann_total_gen : hidroplant.ann_total_gen,
                    lat_res: req.body.lat_res ? req.body.lat_res : hidroplant.lat_res,
                    long_res: req.body.long_res ? req.body.long_res : hidroplant.long_res,
                    lat_hp1: req.body.lat_hp1 ? req.body.lat_hp1 : hidroplant.lat_hp1,
                    long_hp1: req.body.long_hp1 ? req.body.long_hp1 : hidroplant.long_hp1,
                    lat_hp2: req.body.lat_hp2 ? req.body.lat_hp2 : hidroplant.lat_hp2,
                    long_hp2: req.body.long_hp2 ? req.body.long_hp2 : hidroplant.long_hp2,
                    display: req.body.display ? req.body.display : hidroplant.display,
                }
            })

            res.statusCode = 205
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: true, hidroplantUpdate, message: 'UPDATED' }))
            res.end()
        } else {
            res.statusCode = 404
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no hidroplant with this id' }))
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

module.exports.deleteHidroplant = async(req, res) => {
    if (!checkAuth(req, res)) {
        return
    }

    try {
        let arr = []
        arr = req.url.split('/')
        let id = arr[arr.length - 1]
        id = id.padStart(12 - id.length + 1, '0')
        const hidroplant = await req.db.Hidroplant.findOne({ _id: id })

        if (hidroplant) {
            await req.db.Hidroplant.remove({ _id: id })

            res.statusCode = 205
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: true, msg: "removed hidroplant", message: 'DELETED' }))
            res.end()
        } else {
            res.statusCode = 404
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no hidroplant with this id' }))
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

module.exports.getByName = async(req, res) => {
    if (!checkAuth(req, res)) {
        return
    }

    try {
        const name = req.params.name
        const hidroplant = await req.db.Hidroplant.findOne({ name: name })

        if (hidroplant) {
            res.statusCode = 200
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: true, hidroplant, message: 'OK' }))
            res.end()
        } else {
            res.statusCode = 404
            res.setHeader('Content-type', 'application/json')
            res.write(JSON.stringify({ success: false, message: 'no hidroplant for this name' }))
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