const sequelize = require('../sequelize')
const {DataTypes} = require('sequelize')
const users = require('../tables/users')

const friends = sequelize.define(
    'friends',
    {
        friendnum:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        userid:{
            type:DataTypes.STRING,
            allowNull:false
        },
        friendid:{
            type:DataTypes.STRING,
            allowNull:true
        },
        groupid:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        flag:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    },
    {
        timestamps: false,
        tableName:'friends'
    }
)

module.exports = friends