const Sequelize = require('sequelize')

const sequelize =new Sequelize(
    'chat',
    'sheweijie',
    '753951ShE82',
    {
        host:'rm-uf6t3nbwg493gx54eqo.mysql.rds.aliyuncs.com',
        dialect:'mysql'
    }
)