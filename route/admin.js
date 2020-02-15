const express=require('express');
const common=require('../libs/common.js');
const myaql=require('mysql')

var db=mysql.createPool({host:'localhost',user:'root',password:'033629',database:'node_blog'});

module.exports=function (){
    var router=express.Router();

    //检查登录状态
    router.use((req, res, next)=>{
        if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
            res.redirect('/admin/login');
        }else{
            next();
        }
    });

    //
    router.use('/login', (req, res)=>{
        var username=req.body.username;
        var password=common.md5(req.body.password+common.MD5_SUFFIX);

        db.query(`SELECT * FROM admin_table WHERE username='${username}'`,
        (err,data)=>{
            console.log(data);//测试
            if(err){
                console.log(err);
                res.status(500).send('database error').end();
            }else{
               if(data.length==0) {
                   res.status(400).send('no this admin').end();
               }else{
                   if(data[0].password==password){
                       //成功
                       req.session['admin_id']=data[0].ID;
                       res.redirect('/admin/');
                   }else{
                        res.status(400).send('this password is incorrect').end();
                   }
               }
            }
        });

        res.render('admin/login.ejs', {});
    });

    return router;
};
