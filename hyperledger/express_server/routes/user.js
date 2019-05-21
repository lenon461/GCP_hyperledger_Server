var express = require('express');
var router = express.Router();
const query =  require('../hyModule/query.js');
const invoke = require('../hyModule/invoke.js');
const register = require('../hyModule/registerUser.js');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/newUser', async (req, res, next) => {
    try{
        let Userid = req.body.Userid;
        let Userpwd = req.body.Userpwd;
        let result = await register.registerUser(Userid, Userpwd);
        if(result == 1){
            console.log("login is succesed");
            res.json({ id : Userid, pwd : Userpwd,
            });
        }
        else {
            res.status(403).send("failed");
            console.log("login is failed");
        }
    } catch (error){
        console.error(error);
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    try{
        let Userid = req.body.Userid;
        let Userpwd = req.body.Userpwd;
        let result = await register.loginUser(Userid, Userpwd);
        console.log(Userid, Userpwd);
        if(result == 1){
            res.send("success");
            console.log("login is succesed");
        }
        else{
            console.log("login is failed");
            res.send("failed");
        }

    } catch (error){
        console.error(error);
        next(error);
    }
});
/*
router.get('/channels', function(req, res, next) {

    query.queryAllChannels()
        .then((result) => { 
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        }); 
});
router.put('/channels/donate/', function(req, res, next) {
    let channelname = req.body.channelname;
    let id = req.body.id;
    let money = req.body.money;
    invoke.donateMoney(channelname, id, money)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

router.put('/channels/create/', function(req, res, next) {
    let channelname = req.body.channelname;
    let id = req.body.id;
    let name = req.body.name;
    let money = req.body.money;
    
    invoke.createCompany(channelname, id, name, money)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/channels/ledger/', function(req, res, next) {

    let channelname = req.query.channelname;
    query.queryAllCompanys(channelname)
        .then((result) => {
            console.log(result);
            res.json(JSON.parse(JSON.parse(result)));
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/channels/block', function(req, res, next) {
    let channelname = req.query.channelname;
    query.queryblockinfo(channelname)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/channels/block2', function(req, res, next) {
    let channelname = req.query.channelname;
    query.queryblockinfo2(channelname)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/channels/txlist', function(req, res, next) {
    let channelname = req.query.channelname;
    query.querytxinfo(channelname)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});
*/
module.exports = router;
