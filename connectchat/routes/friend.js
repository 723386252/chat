var express = require('express');
var router = express.Router();
const friendapi = require('../api/firend')

router.get('/addgroup',(req,res)=>{
    let {userid,groupname} = req.query
    friendapi.addgroup(userid,groupname).then(result=>{
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

router.get('/addrequest',(req,res)=>{
    let {userid,friendid} = req.query
    friendapi.addrequest(userid,friendid).then(result=>{
        if(result != null){
            res.send({
                success:1,
                error_code:0,
                data:result[0]
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
    friendapi.initfriend(userid,friendid).then(result=>{
        if(result[0].dataValues.flag == 0){
            let friendnum = result[0].dataValues.friendnum
            friendapi.alertgroup(friendnum,groupid).then(result=>{
                res.send({
                    success:1,
                    error_code:0
                })
            }).catch(error=>{
                res.send({
                    success:0,
                    error_code:101
                })
            })
            
        }
        else{
            res.send({
                success:0,
                error_code:102
            })
        }
    }).catch(error=>{
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

router.get('/comfriend',(req,res)=>{
    let {friendid,userid} = req.query
    Promise.all([
        new Promise((resolve,reject)=>{
            friendapi.comfriend(userid,friendid).then(result=>{
                resolve(result)
            }).catch(error=>{
                reject(error)
            })
        }),
        new Promise((resolve,reject)=>{
            friendapi.comfriend(friendid,userid).then(result=>{
                resolve(result)
            }).catch(error=>{
                reject(error)
            })
        })
    ]).then(results=>{
        if(results.length == 2){
            res.send({
                success:1,
                error_code:0
            })
        }
        else{
            res.send({
                success:0,
                error_code:103
            })
        }
    }).catch(error=>{
        res.send({
            success:0,
            error_code:101
        })
    })
    
})

router.get('/replyrequest',(req,res)=>{
    let {requestid} = req.query
    friendapi.replyrequest(requestid).then(result=>{
        if(result.length == 1){
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
    }).catch(error=>{
        res.send({
            success:0,
            error_code:101
        })
    })
})

router.get('/getfriend',(req,res)=>{
    let userid = req.query.userid
    friendapi.getgroup(userid).then(result_0=>{
            friendapi.getfriend(userid).then(result_1=>{
                let friend = []
                console.log(result_1);
                for(let i = 0;i < result_0.length;i++){
                    friend.push({groupid:result_0[i].dataValues.groupid,groupname:result_0[i].dataValues.groupname,friendlist:[]})
                    for(let j = 0;j < result_1.length;j++){
                        if(result_1[j].groupid == result_0[i].dataValues.groupid){
                            friend[i].friendlist.push(result_1)
                        }
                    }
                }
                // console.log(friend);
                res.send({
                    success:1,
                    error_code:0,
                    data:friend
                })
            }).catch(error=>{
                res.send({
                    success:0,
                    error_code:101
                })
            })
    }).catch(error=>{
        res.send({
            success:0,
            error_code:101
        })
    })
})
module.exports = router