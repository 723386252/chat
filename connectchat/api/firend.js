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
            attributes:['from','requestid'],
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

    initfriend(userid,friendid){
        return friends.findOrCreate({
            where:{
                userid,
                friendid
            },
            defaults:{
                userid,
                friendid,
                flag:0
            }
        })
    },
    alertgroup(friendnum,groupid){
        return friends.update({groupid},{
            where:{
                friendnum
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
    },
    comfriend(userid,friendid){
        return friends.update({flag:1},{
            where:{
                userid,
                friendid
            }
        })
    },
    replyrequest(requestid){
        return request.update({flag:1},{
            where:{
                requestid
            }
        })
    },
    addrequest(from,to){
        return request.findOrCreate({
            where:{
                from,
                to,
                flag:0
            }
        })
    }
}

module.exports = api