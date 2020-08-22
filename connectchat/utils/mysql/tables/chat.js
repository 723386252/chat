const sequelize = require('../sequelize')
const {DataTypes} = require('sequelize')

const chat = sequelize.define(
    'chat',
    {
        chatid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        content:{
            type:DataTypes.STRING,
        },
        from:{
            type:DataTypes.STRING,
            allowNull:false
        },
        to:{
            type:DataTypes.STRING,
            allowNull:false
        },
        time:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false,
        tableName:'chat'
    }
)

module.exports = chat