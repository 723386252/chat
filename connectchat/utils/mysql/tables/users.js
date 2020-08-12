const sequelize = require('../sequelize')

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
            type:DataTypes.DATE,
            allowNull:false
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