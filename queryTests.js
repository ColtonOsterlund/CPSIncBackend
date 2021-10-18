const express = require('express');
const app = express();
const cors = require('cors');
const net = require('net');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require('crypto')
const async = require('async')
var url = require('url')
const { v4: uuidv4 } = require("uuid");
const nodemailer = require('nodemailer');
const validatePhoneNumber = require('validate-phone-number-node-js');
const { Console } = require('console');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb' }));
app.use(morgan('short'));
dotenv.config()
app.use(cors());


//create database pool
const pool = mysql.createPool({ //connection pool 
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-02.cleardb.net',
       user: 'b97ac0ec9c55a7',
    password: process.env.DB_PASSWORD, //find how to do this properly
    database: 'heroku_bcd0fd1226bfc07'
})

//get connection
function getConnection(){
    return pool
}

//run sql query
function sqlQuery(){

	query = "SELECT * FROM test;";
	arguments = null;

	getConnection().query(query, arguments, (err, rows, fields) => {

		if(err != null){
			console.log(err);
		}
		else{

			console.log('\r\n');
			console.log('\r\n');
			console.log('\r\n');

			var headerRow = "";
			headerRow += "Date, ";
			headerRow += "Test Type, ";
			headerRow += "Units, ";
			headerRow += "Value, ";
			headerRow += "Cow ID, ";
			headerRow += "User ID, ";
			headerRow += "Milk Fever, ";
			headerRow += "Test ID, ";
			headerRow += "Follow Up Number, ";
			headerRow += "Herd ID, ";
			headerRow += "Milivolts, ";
			headerRow += "Deleted";

			console.log(headerRow);

			rows.forEach(function(row){
				var decrypted_CommaSeperated_Row = "";
				
				decrypted_CommaSeperated_Row += decrypt(row.date);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.testType);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.units);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.value);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.cowID);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.userID);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.milkFever);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.testID);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.followUpNum);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.herdID);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += decrypt(row.milivolts);
				decrypted_CommaSeperated_Row += ", ";
				decrypted_CommaSeperated_Row += row.deleted;
				
				console.log(decrypted_CommaSeperated_Row);
			});

			console.log('\r\n');
			console.log('\r\n');
			console.log('\r\n');

		}

	})
}

function encrypt(text){
	if (text == null) {
		return text;
	}
	var cipher = crypto.createCipher('aes-256-ctr', process.env.ENCRYPTION_KEY)
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
 }

 function decrypt(text){
	if (text == null) {
		return text;
	}
	var decipher = crypto.createDecipher('aes-256-ctr', process.env.ENCRYPTION_KEY)
	var dec = decipher.update(text, 'hex', 'utf8')
	dec += decipher.final('utf8')
	return dec
 }


 sqlQuery();