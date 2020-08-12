const users = require('../utils/mysql/tables/users')
const sequelize = require('../utils/mysql/sequelize')
const api = {
    submitregister: function (userid,username,password,portrait,sex){
        return users.create({
            userid,
            username,
            password,
            portrait,
            sex,
            registertime:sequelize.fn('NOW')
        })
    }
}
module.exports = api