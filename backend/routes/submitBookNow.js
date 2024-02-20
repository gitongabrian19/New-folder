const express = require('express');
const mysql = require('mysql');
//const connection = require('../public/javascripts/databaseConn');
const submit = express.Router();
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotelsystem'
});

submit.post('/submitBookNow', (req, res) => {
    try{
        const { name2,phone2,checkIn2,checkOut2,guest2} = req.body;
        console.log(req.body);

    const sql = `INSERT INTO booknow (name, phone, checkIn,checkOut, guests) VALUES (?, ?, ?,?,?)`;
    connection.query(sql, [name2,phone2,checkIn2,checkOut2,guest2]);

      res.status.json({success:true,message:1});
    }catch(error){
        console.error('Error inserting data:', err);
        //res.status(500).send('Error inserting data');
    }
    
});

module.exports = submit