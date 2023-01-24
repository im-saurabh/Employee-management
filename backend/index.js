const express = require('express');
const bodyparser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'simpledb',
    port:3306
});

// check database Connection

db.connect(err=>{
    if (err){console.log(err,'dberr');}
    console.log('database connected ...')
})

// get all data
app.get('/employee',(req,res) =>{
    let qr = `select * from employee`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }

        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            })
        }
    })
})

// get single data
app.get('/employee/:id',(req,res)=>{
    
    let gID = req.params.id;

    let qr =`select * from employee where id = ${gID}`;

    db.query(qr,(err,result)=>{

        if(err) 
        {
            console.log(err);
        }
        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message:'data not found'
            });
        }
    })
})

// create data

app.post('/employee',(req,res)=>{
    console.log(req.body,'createdata');
    
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `insert into employee(fullname,email,mobile) 
            values('${fullName}','${eMail}','${mb}')`;
            
            db.query(qr,(err,result)=>{
                if(err){console.log(err);}
                console.log(result,'result')
                res.send({
                    message:'data inserted',
                })
            })
})

// update single data
app.put('/employee/:id',(req,res)=>{
    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr =`update employee set fullname = '${fullName}', email = '${eMail}', mobile = '${mb}'
            where id = ${gID}`;

    db.query(qr,(err,result) => {
        if(err)
        {
            console.log(err);
        }
        res.send({
            message:'data updated'
        });
    });
});

//delete single data

app.delete('/employee/:id',(req,res)=>{
    let gID = req.params.id;

    let qr = `delete from employee where id = '${gID}'`
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(
            {
            message:'data deleted'
            })
    })
})

//get employee name whose contain past keyword



app.listen(3000,()=>{
    console.log('server running');
});