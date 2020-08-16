var express = require('express');
var router = express.Router();
const friendapi = require('../api/firend')

router.get('/addgroup',(req,res)=>{
    let {userid,groupname} = req.query
    friendapi.addgroup(userid,groupname).then(result=>{
        if(result!== null){
            res.send({
                success:1,
                error_code:0
            })
        }
        else{
            res.send({
                success:0,
                error_code:100
            })
        }
    }).catch(err=>{
        res.send({
            success:0,
            error_code:101
        })
    })
})

router.get('/getrequest',(req,res)=>{
    // console.log(req.query);
    let userid = req.query.userid
    friendapi.getrequest(userid).then(result=>{
        if(result!== null){
            res.send({
                success:1,
                error_code:0,
                data:result
            })
        }else{
            res.send({
                success:0,
                error_code:100
            })
        }
    }).catch(err=>{
        res.send({
            success:0,
            error_code:101
        })
    })
})
module.exports = router