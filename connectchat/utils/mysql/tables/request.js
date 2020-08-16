const sequelize = require('../sequelize')
const {DataTypes} = require('sequelize')

const request = sequelize.define(
    'request',
    {
        requestid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        from:{
            type:DataTypes.STRING,
            allowNull:false
        },
        to:{
            type:DataTypes.STRING,
            allowNull:true
        },
        flag:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
        
    },
    {
        timestamps: false,
        tableName:'request'
    }
)

module.exports = request