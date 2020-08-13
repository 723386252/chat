const users = require('../utils/mysql/tables/users')
const sequelize = require('../utils/mysql/sequelize')
const api = {
    submitregister(userid,username,password,portrait,sex){
        return users.create({
            userid,
            username,
            password,
            portrait,
            sex,
            registertime:sequelize.fn('NOW')
        })
    },
    submitlogin(userid,password){
        return users.findOne({
            attributes:['userid','username','portrait'],
            where:{
                userid,
                password
            }
        })
    }
}
module.exports = api