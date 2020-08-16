const groups = require('../utils/mysql/tables/groups')
const sequelize = require('../utils/mysql/sequelize')
const request = require('../utils/mysql/tables/request')

const api = {
    addgroup(userid,groupname){
        return groups.create({
            userid,
            groupname
        })
    },
    getrequest(userid){
        return request.findAll({
            attributes:['from'],
            where:{
                'to':userid,
                'flag':0
            }
        })
    }
}
module.exports = api