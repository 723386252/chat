const groups = require('../utils/mysql/tables/groups')
const sequelize = require('../utils/mysql/sequelize')
const request = require('../utils/mysql/tables/request')
const users = require('../utils/mysql/tables/users')
const friends = require('../utils/mysql/tables/friends')

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
    },
    getuserinfo(userid){
        return users.findAll({
            attributes:['userid','username','portrait','sex'],
            where:{
                'userid':userid
            }
        })
    },
    addfriend(userid,friendid,groupid){
        
},
    initfriend(userid,friendid,groupid){
        return friends.findOrCreate({
            where:{
                userid,
                friendid
            },
            defaults:{
                userid,
                friendid,
                groupid,
                flag:0
            }
        })
    },
    getgroup(userid){
        return groups.findAll({
            attributes:['groupname','groupid'],
            where:{
                'userid':userid
            }
        })
    }
}

module.exports = api