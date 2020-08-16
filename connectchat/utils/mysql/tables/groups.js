const sequelize = require('../sequelize')
const {DataTypes} = require('sequelize')

const groups = sequelize.define(
    'groups',
    {
        groupid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        userid:{
            type:DataTypes.STRING,
            allowNull:false
        },
        groupname:{
            type:DataTypes.STRING,
            allowNull:true
        },
        
    },
    {
        timestamps: false,
        tableName:'groups'
    }
)

module.exports = groups