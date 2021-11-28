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
// function sqlQuery(){

// 	query = "SELECT * FROM test;";
// 	arguments = null;

// 	getConnection().query(query, arguments, (err, rows, fields) => {

// 		if(err != null){
// 			console.log(err);
// 		}
// 		else{

// 			console.log('\r\n');
// 			console.log('\r\n');
// 			console.log('\r\n');

// 			var headerRow = "";
// 			headerRow += "Date, ";
// 			headerRow += "Test Type, ";
// 			headerRow += "Units, ";
// 			headerRow += "Value, ";
// 			headerRow += "Cow ID, ";
// 			headerRow += "User ID, ";
// 			headerRow += "Milk Fever, ";
// 			headerRow += "Test ID, ";
// 			headerRow += "Follow Up Number, ";
// 			headerRow += "Herd ID, ";
// 			headerRow += "Milivolts, ";
// 			headerRow += "Lactation Number, ";
// 			headerRow += "Days Carried Calf if Pregnant, ";
// 			headerRow += "Projected Due Date, ";
// 			headerRow += "Current 305 Day Milk, ";
// 			headerRow += "Current Somatic Cell Count, ";
// 			headerRow += "Linear Score at Last Test, ";
// 			headerRow += "Date of Last Clinical Mastitis, ";
// 			headerRow += "Chain Visible ID, ";
// 			headerRow += "Animal Registration No NLID, ";
// 			headerRow += "Dam Breed, ";
// 			headerRow += "Deleted";

// 			console.log(headerRow);

// 			rows.forEach(function(row){
// 				var decrypted_CommaSeperated_Row = "";
				
// 				decrypted_CommaSeperated_Row += decrypt(row.date);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.testType);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.units);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.value);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.cowID);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.userID);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.milkFever);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.testID);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.followUpNum);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.herdID);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += row.milivolts;
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.lactationNumber);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.daysCarriedCalfIfPregnant);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.projectedDueDate);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.current305DayMilk);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.currentSomaticCellCount);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.linearScoreAtLastTest);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.dateOfLastClinicalMastitis);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.chainVisibleID);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.animalRegistrationNoNLID);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += decrypt(row.damBreed);
// 				decrypted_CommaSeperated_Row += ", ";
// 				decrypted_CommaSeperated_Row += row.deleted;
				
// 				console.log(decrypted_CommaSeperated_Row);
// 			});

// 			console.log('\r\n');
// 			console.log('\r\n');
// 			console.log('\r\n');

// 		}

// 	})
// }




// //run sql query
function sqlQuery(){

	query = "INSERT * FROM herd;";
	arguments = null;

	for(var i = 0; i < 100; i++){
		var cowID = encrypt(String(i))
		var daysInMilk = encrypt(String(2))
		var dryOffDay = encrypt(String(2))
		var mastitisHistory = encrypt(String(2))
		var methodOfDryOff = encrypt(String(2))
		var dailyMilkAverage = encrypt(String(2))
		var parity = encrypt(String(2))
		var reproductionStatus = encrypt(String(2))
		var numberOfTimesBred = encrypt(String(2))
		var farmBreedingIndex = encrypt(String(2))
		var herdID = encrypt(String(100000))
		var userID = encrypt(String(100000))
		var lactationNumber = encrypt(String(2))
		var daysCarriedCalfIfPregnant = encrypt(String(2))
		var projectedDueDate = encrypt(String(2))
		var current305DayMilk = encrypt(String(100 - i))
		var currentSomaticCellCount = encrypt(String(i))
		var linearScoreAtLastTest = encrypt(String(2))
		var dateOfLastClinicalMastitis = encrypt(String(2))
		var chainVisibleId = encrypt(String(2))
		var animalRegistrationNoNLID = encrypt(String(2))
		var damBreed = encrypt(String(2))
		var culled = 0
		var modifyDate = encrypt(String(2))
	
	
		// getConnection().query("INSERT INTO cow (id, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, herdID, userID, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, culled, modifyDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [cowID, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, herdID, userID, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, culled, modifyDate], (err, rows) => {
		// 	if(err != null){
		// 		console.log(err)
		// 	}
		// 	else{
		// 		console.log("Cow added")

				var date = encrypt(String(2))
				var dataType = encrypt(String(2))
				var runtime = encrypt(String(2))
				var testType = encrypt(String(2))
				var units = encrypt(String(2))
				var value = encrypt(String(i * 0.06))
				var milkFever = encrypt(String(2))
				var followUpNum = encrypt(String(2))
				var testID = encrypt(String(i))
				var milivolts = String(2)



				getConnection().query("INSERT INTO test (date, testType, units, value, cowID, userID, herdID, milkFever, followUpNum, testID, milivolts, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, farmBreedingIndex, parity, reproductionStatus, numberOfTimesBred, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleID, animalRegistrationNoNLID, damBreed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [date, testType, units, value, cowID, userID, herdID, milkFever, followUpNum, testID, milivolts, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, farmBreedingIndex, parity, reproductionStatus, numberOfTimesBred, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed], (err2, rows) => {
								
								
								if(err2 != null){
									console.log("Error: " + err)
									
								}
								else{
									console.log("Test Saved")
									
								}
							})


			// }
		// })

	}


	





	// getConnection().query(query, arguments, (err, rows, fields) => {

	// 	if(err != null){
	// 		console.log(err);
	// 	}
	// 	else{

	// 		console.log('\r\n');
	// 		console.log('\r\n');
	// 		console.log('\r\n');

	// 		rows.forEach(function(row){
	// 			console.log(decrypt(row.id));
	// 			console.log(decrypt(row.userID));
	// 		});

	// 		console.log('\r\n');
	// 		console.log('\r\n');
	// 		console.log('\r\n');

	// 	}

	// })
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