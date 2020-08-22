const sequelize = require('../utils/mysql/sequelize')
const request = require('../utils/mysql/tables/request')
const chat = require('../utils/mysql/tables/chat')
const { QueryTypes } = require('sequelize');

const api = {
    sendmessage(from,to,content){
      return chat.create({
            from,
            to,
            content
        })
    },
    getchatrecord(userid,friendid){
        return sequelize.query(`select * from chat where \`from\` = '${userid}' and \`to\` = '${friendid}' union select * from chat where \`from\` = '${friendid}' and \`to\` = '${userid}' order by time ASC`,{ type: QueryTypes.SELECT })
    }
}

module.exports = api