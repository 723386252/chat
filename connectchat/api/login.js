const users = require('../utils/mysql/tables/users')

const api = {
    submitregister: function (userid,username,password,portrait,sex){
        users.create({
            userid,
            username,
            password,
            portrait,
            sex,
            registertime:now()
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
}