const users = require('../utils/mysql/tables/users')

const api = {
    submitregister: function (userid,username,password,portrait,sex){
        return users.create({
            userid,
            username,
            password,
            portrait,
            sex
        })
    }
}
module.exports = api