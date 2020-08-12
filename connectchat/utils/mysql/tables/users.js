const sequelize = require('../sequelize')
const {DataTypes} = require('sequelize')

const users = sequelize.define(
    'users',
    {
        userid:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        portrait:{
            type:DataTypes.STRING
        },
        registertime:{
            type:DataTypes.DATE
        },
        sex:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        timestamps: false
    }
)

module.exports = users