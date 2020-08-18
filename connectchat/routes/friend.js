var express = require('express');
var router = express.Router();
const friendapi = require('../api/firend')

router.get('/addgroup',(req,res)=>{
    let {userid,groupname} = req.query
    friendapi.addgroup(userid,groupname).then(result=>{
        if(result.length != 0){
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
        if(result.length != 0){
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
router.get('/getuserinfo',(req,res)=>{
    let userid = req.query.userid
    friendapi.getuserinfo(userid).then(result=>{
        result[0].portrait = 'http://127.0.0.1:3000' + result[0].portrait
        if(result.length != 0){
            res.send({
                success:1,
                error_code:0,
                data:result
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

router.get('/initfriend',(req,res)=>{
    let {groupid,userid,friendid} = req.query
    friendapi.initfriend(userid,friendid,groupid).then(result=>{
        console.log(result);
        if(result[0].dataValues.flag == 0){
            res.send({
                success:1,
                error_code:0
            })
        }
        else{
            res.send({
                success:0,
                error_code:102
            })
        }
    }).catch(error=>{
        console.log(error);
        res.send({
            success:0,
            error_code:101
        })
    })
})

router.get('/getgroup',(req,res)=>{
    let userid = req.query.userid
    friendapi.getgroup(userid).then(result=>{
        if(result.length != 0){
            res.send({
                success:1,
                error_code:0,
                data:result
            })
        }
        else{
            res.send({
                success:0,
                error_code:100
            })
        }
    }).catch(error=>{
        res.send({
            success:0,
            error_code:101
        })
    })
})
module.exports = router