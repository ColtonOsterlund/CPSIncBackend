//load our app server using express

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


//GET REQUESTS/////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", authorizeUser, (req, res) => {
	console.log("Root Request")
	
	res.send("ROOT")
	
})


app.get("/herd", authorizeUser, (req, res) => {
		console.log("Fetching ALL Herds")

		if(req.query.herdID != null){
			//query from query string
			sqlQuery("SELECT * FROM herd WHERE id = ?", encrypt(req.query.herdID), (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(herd){
						if(herd.userID.substring(0, 11) != "depreciated"){
							var herdObject = {
								id: decrypt(herd.id),
								location: decrypt(herd.location),
								milkingSystem: decrypt(herd.milkingSystem),
								pin: decrypt(herd.pin)
							}

							jsonObjects.push(herdObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
		else{
			sqlQuery("SELECT * FROM herd", null, (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(herd){
						if(herd.userID.substring(0, 11) != "depreciated"){
							console.log(herd.id)

							var herdObject = {
								id: decrypt(herd.id),
								location: decrypt(herd.location),
								milkingSystem: decrypt(herd.milkingSystem),
								pin: decrypt(herd.pin)
							}

							jsonObjects.push(herdObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
		
})

app.get("/cow", authorizeUser, (req, res) => {
		console.log("Fetching ALL Cows")

		if(req.query.herdID != null){
			//query from query string
			sqlQuery("SELECT * FROM cow WHERE herdID = ?", encrypt(req.query.herdID), (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(cow){
						if(cow.userID.substring(0, 11) != "depreciated"){
							var cowObject = {
								id: decrypt(cow.id),
								herdID: decrypt(cow.herdID),
								daysInMilk: decrypt(cow.daysInMilk),
								dryOffDay: decrypt(cow.dryOffDay),
								lactationNumber: decrypt(cow.lactationNumber),
								daysCarriedCalfIfPregnant: decrypt(cow.daysCarriedCalfIfPregnant),
								projectedDueDate: decrypt(cow.projectedDueDate),
								current305DayMilk: decrypt(cow.current305DayMilk),
								currentSomaticCellCount: decrypt(cow.currentSomaticCellCount),
								linearScoreAtLastTest: decrypt(cow.linearScoreAtLastTest),
								dateOfLastClinicalMastitis: decrypt(cow.dateOfLastClinicalMastitis),
								chainVisibleId: decrypt(cow.chainVisibleId),
								animalRegistrationNoNLID: decrypt(cow.animalRegistrationNoNLID),
								damBreed: decrypt(cow.damBreed),
								culled: cow.culled,
								modifyDate: decrypt(cow.modifyDate)
							}

							jsonObjects.push(cowObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
		
		else if(req.query.cowID != null){
			sqlQuery("SELECT * FROM cow WHERE cowID = ?", encrypt(req.query.cowID), (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(cow){
						if(cow.userID.substring(0, 11) != "depreciated"){
							var cowObject = {
								id: decrypt(cow.id),
								herdID: decrypt(cow.herdID),
								daysInMilk: decrypt(cow.daysInMilk),
								dryOffDay: decrypt(cow.dryOffDay),
								lactationNumber: decrypt(cow.lactationNumber),
								daysCarriedCalfIfPregnant: decrypt(cow.daysCarriedCalfIfPregnant),
								projectedDueDate: decrypt(cow.projectedDueDate),
								current305DayMilk: decrypt(cow.current305DayMilk),
								currentSomaticCellCount: decrypt(cow.currentSomaticCellCount),
								linearScoreAtLastTest: decrypt(cow.linearScoreAtLastTest),
								dateOfLastClinicalMastitis: decrypt(cow.dateOfLastClinicalMastitis),
								chainVisibleId: decrypt(cow.chainVisibleId),
								animalRegistrationNoNLID: decrypt(cow.animalRegistrationNoNLID),
								damBreed: decrypt(cow.damBreed),
								culled: cow.culled,
								modifyDate: decrypt(cow.modifyDate)
							}

							jsonObjects.push(cowObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
		
		else{
			sqlQuery("SELECT * FROM cow", null, (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(cow){
						if(cow.userID.substring(0, 11) != "depreciated"){
							var cowObject = {
								id: decrypt(cow.id),
								herdID: decrypt(cow.herdID),
								daysInMilk: decrypt(cow.daysInMilk),
								dryOffDay: decrypt(cow.dryOffDay),
								lactationNumber: decrypt(cow.lactationNumber),
								daysCarriedCalfIfPregnant: decrypt(cow.daysCarriedCalfIfPregnant),
								projectedDueDate: decrypt(cow.projectedDueDate),
								current305DayMilk: decrypt(cow.current305DayMilk),
								currentSomaticCellCount: decrypt(cow.currentSomaticCellCount),
								linearScoreAtLastTest: decrypt(cow.linearScoreAtLastTest),
								dateOfLastClinicalMastitis: decrypt(cow.dateOfLastClinicalMastitis),
								chainVisibleId: decrypt(cow.chainVisibleId),
								animalRegistrationNoNLID: decrypt(cow.animalRegistrationNoNLID),
								damBreed: decrypt(cow.damBreed),
								culled: cow.culled,
								modifyDate: decrypt(cow.modifyDate)
							}

							jsonObjects.push(cowObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
})

app.get("/test", authorizeUser, (req, res) => {
		console.log("Fetching ALL Tests")

		if(req.query.cowID != null){
			//query from query string
			sqlQuery("SELECT * FROM test WHERE cowID = ?", encrypt(req.query.cowID), (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(test){
						if(test.userID.substring(0, 11) != "depreciated"){
							var testObject = {
								date: decrypt(test.date),
								followUpNum: decrypt(test.followUpNum),
								testID: decrypt(test.testID),
								testType: decrypt(test.testType),
								units: decrypt(test.units),
								value: decrypt(test.value),
								milkFever: decrypt(test.milkFever),
								cowID: decrypt(test.cowID)
							}

							jsonObjects.push(testObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
		
		else{
			sqlQuery("SELECT * FROM test", null, (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(test){
						if(test.userID.substring(0, 11) != "depreciated"){
							var testObject = {
								date: decrypt(test.date),
								followUpNum: decrypt(test.followUpNum),
								testID: decrypt(test.testID),
								testType: decrypt(test.testType),
								units: decrypt(test.units),
								value: decrypt(test.value),
								milkFever: decrypt(test.milkFever),
								cowID: decrypt(test.cowID)
							}

							jsonObjects.push(testObject)
						}
					})

					return res.send(JSON.stringify(jsonObjects))
				}
			})
		}
})



app.get("/backup", authorizeUser, (req, res) => {
	console.log("Backup Route")

	var userID = encrypt(String(req.header("user-id")))

	console.log("User ID: " + userID)

	var jsonObjects = [] //empty array to put all objects into to then be turned to a JSON object

	//get all herds associated with userID


	//get all cows associated with userID


	//get all tests associated with userID
	
	sqlQuery("SELECT * FROM herd WHERE userID = ?", [userID], (err, objects) => {
		if(err){
			return res.send("Error: " + err)
		}
		else{
			
			objects.forEach(function(herd){
				if(herd.userID.substring(0, 11) != "depreciated"){
					var herdObject = {
						objectType: "Herd",
						id: decrypt(herd.id),
						location: decrypt(herd.location),
						milkingSystem: decrypt(herd.milkingSystem),
						pin: decrypt(herd.pin)
					}

					jsonObjects.push(herdObject)
				}
			})

			sqlQuery("SELECT * FROM cow WHERE userID = ?", [userID], (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					
					objects.forEach(function(cow){
						if(cow.userID.substring(0, 11) != "depreciated"){
							var cowObject = {
								id: decrypt(cow.id),
								daysInMilk: decrypt(cow.daysInMilk),
								dryOffDay: decrypt(cow.dryOffDay),
								mastitisHistory: decrypt(cow.mastitisHistory),
								methodOfDryOff: decrypt(cow.methodOfDryOff),
								dailyMilkAverage: decrypt(cow.dailyMilkAverage),
								parity: decrypt(cow.parity),
								reproductionStatus: decrypt(cow.reproductionStatus),
								numberOfTimesBred: decrypt(cow.numberOfTimesBred),
								farmBreedingIndex: decrypt(cow.farmBreedingIndex),
								herdID: decrypt(cow.herdID),
								userID: decrypt(cow.userID),
								lactationNumber: decrypt(cow.lactationNumber),
								daysCarriedCalfIfPregnant: decrypt(cow.daysCarriedCalfIfPregnant),
								projectedDueDate: decrypt(cow.projectedDueDate),
								current305DayMilk: decrypt(cow.current305DayMilk),
								currentSomaticCellCount: decrypt(cow.currentSomaticCellCount),
								linearScoreAtLastTest: decrypt(cow.linearScoreAtLastTest),
								dateOfLastClinicalMastitis: decrypt(cow.dateOfLastClinicalMastitis),
								chainVisibleId: decrypt(cow.chainVisibleId),
								animalRegistrationNoNLID: decrypt(cow.animalRegistrationNoNLID),
								damBreed: decrypt(cow.damBreed),
								culled: cow.culled,
								modifyDate: decrypt(cow.modifyDate)
							}
		
							jsonObjects.push(cowObject)
						}
					})
		
					sqlQuery("SELECT * FROM test WHERE userID = ?", [userID], (err, objects) => {
						if(err){
							return res.send("Error: " + err)
						}
						else{
							
							objects.forEach(function(test){
								if(test.userID.substring(0, 11) != "depreciated"){
									var testObject = {
										objectType: "Test",
										date: decrypt(test.date),
										followUpNum: decrypt(test.followUpNum),
										testID: decrypt(test.testID),
										testType: decrypt(test.testType),
										units: decrypt(test.units),
										value: decrypt(test.value),
										milkFever: decrypt(test.milkFever),
										cowID: decrypt(test.cowID)
									}
				
									jsonObjects.push(testObject)
								}
							})

							return res.send(JSON.stringify(jsonObjects))

						}
					})
				}
			})	
		}
	})
})



app.get("/user-test-app", authorizeUser, (req, res) => {
	console.log("Fetching cows by userID and herdID")

	if(req.query.userID != null && req.query.herdID != null && req.query.cowID != null){
		sqlQuery("SELECT * FROM test WHERE userID = ? AND herdID = ? AND cowID = ?", [encrypt(req.query.userID), encrypt(req.query.herdID), encrypt(req.query.cowID)], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{
				var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

				objects.forEach(function(test){
					if(test.userID.substring(0, 11) != "depreciated"){

						var testObject = {
							objectType: "Test",
							date: decrypt(test.date),
							followUpNum: decrypt(test.followUpNum),
							testID: decrypt(test.testID),
							testType: decrypt(test.testType),
							units: decrypt(test.units),
							value: decrypt(test.value),
							milkFever: decrypt(test.milkFever),
							cowID: decrypt(test.cowID),
							herdID: decrypt(test.herdID)
								
						}

						jsonObjects.push(testObject)
					}
				})

				return res.send(JSON.stringify(jsonObjects))
			}
		})
	}
})







app.get("/user-cow-app", authorizeUser, (req, res) => {
	console.log("Fetching cows by userID and herdID")

	if(req.query.userID != null && req.query.herdID != null){
		sqlQuery("SELECT * FROM cow WHERE userID = ? AND herdID = ? AND deleted = ?", [encrypt(req.query.userID), encrypt(req.query.herdID), 0], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{
				var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

				objects.forEach(function(cow){
					if(cow.userID.substring(0, 11) != "depreciated"){

						var cowObject = {
							id: decrypt(cow.id),
								daysInMilk: decrypt(cow.daysInMilk),
								dryOffDay: decrypt(cow.dryOffDay),
								mastitisHistory: decrypt(cow.mastitisHistory),
								methodOfDryOff: decrypt(cow.methodOfDryOff),
								dailyMilkAverage: decrypt(cow.dailyMilkAverage),
								parity: decrypt(cow.parity),
								reproductionStatus: decrypt(cow.reproductionStatus),
								numberOfTimesBred: decrypt(cow.numberOfTimesBred),
								farmBreedingIndex: decrypt(cow.farmBreedingIndex),
								herdID: decrypt(cow.herdID),
								userID: decrypt(cow.userID),
								lactationNumber: decrypt(cow.lactationNumber),
								daysCarriedCalfIfPregnant: decrypt(cow.daysCarriedCalfIfPregnant),
								projectedDueDate: decrypt(cow.projectedDueDate),
								current305DayMilk: decrypt(cow.current305DayMilk),
								currentSomaticCellCount: decrypt(cow.currentSomaticCellCount),
								linearScoreAtLastTest: decrypt(cow.linearScoreAtLastTest),
								dateOfLastClinicalMastitis: decrypt(cow.dateOfLastClinicalMastitis),
								chainVisibleId: decrypt(cow.chainVisibleId),
								animalRegistrationNoNLID: decrypt(cow.animalRegistrationNoNLID),
								damBreed: decrypt(cow.damBreed),
								culled: cow.culled,
								modifyDate: decrypt(cow.modifyDate)
						}

						jsonObjects.push(cowObject)
					}
				})

				return res.send(JSON.stringify(jsonObjects))
			}
		})
	}
})

app.get("/user-herd-app", authorizeUser, (req, res) => {
	console.log("Fetching herds by userID: " + encrypt(req.query.userID))

	if(req.query.userID != null){
		sqlQuery("SELECT * FROM herd WHERE userID = ? AND deleted = ?", [encrypt(req.query.userID), 0], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{
				var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

				objects.forEach(function(herd){
					if(herd.userID.substring(0, 11) != "depreciated"){
						var cowObject = {
							id: decrypt(herd.id),
							location: decrypt(herd.location),
							milkingSystem: decrypt(herd.milkingSystem),
							pin: decrypt(herd.pin)
						}

						console.log(cowObject)

						jsonObjects.push(cowObject)
					}
				})

				return res.send(JSON.stringify(jsonObjects))
			}
		})
	}
})






app.get("/user-herd-delete-app", authorizeUser, (req, res) => {

	if(req.query.userID != null){
		sqlQuery("UPDATE herd SET deleted = ? WHERE userID = ? && id = ?", [1, encrypt(req.query.userID), encrypt(req.query.herdID)], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{

				sqlQuery("UPDATE cow SET deleted = ? WHERE userID = ? && herdID = ?", [1, encrypt(req.query.userID), encrypt(req.query.herdID)], (err, objects) => {
					if(err){
						return res.send("Error: " + err)
					}
					else{
						return res.send(JSON.stringify("Success"))
					}
				})

			}
		})
	}
})


app.get("/user-cow-delete-app", (req, res) => {
	console.log("Fetching cows by userID and herdID")

	if(req.query.userID != null && req.query.herdID != null){
		sqlQuery("UPDATE cow SET deleted = ? WHERE userID = ? && herdID = ? && id = ?", [1, encrypt(req.query.userID), encrypt(req.query.herdID), encrypt(req.query.cowID)], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{
				
				return res.send(JSON.stringify("Success"))
			}
		})
	}
})








app.post('/saveEmail', (req, res) => {

	console.log("Email: " + req.body.email);
	console.log("URL: " + req.body.url);
	let uuid = uuidv4();

	res.header('Access-Control-Allow-Origin', '*');

	if(req.body.email != undefined){
		//SET THIS BELOW AS THE CALLBACK FUNCTION FOR THE QUERY TO DELETE ALL PREVIOUS COWS WITH THE SAME USERID
		sqlQuery("INSERT INTO collectedemails (email, visits) VALUES (?, ?) ON DUPLICATE KEY UPDATE visits = visits + 1", [req.body.email, 1], (err, rows) => {
			if(err != null){
				return res.send(err)
			}
			else{

				sqlQuery("INSERT INTO newuuids (uuid) VALUES (?)", [uuid], (err, rows) => {
					if(err != null){
						return res.send(err)
					}
					else{



						var transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
							  user: 'creativeproteinsolutions@gmail.com',
							  pass: 'fjammuzzaddgherw'
							},
							host: process.env.EMAIL_HOST,
							port: process.env.EMAIL_HOST || 456,
							secure: true
						});
						  
						var mailOptions = {
							from: 'creativeproteinsolutions@gmail.com',
							to: req.body.email,
							html: '<p><a href="' + req.body.url + "?id=" + uuid + '">Click here</a> to gain one-time access to the online Creative Protein Solutions Calciulator tool</p><br><br>' + 
							"<p>Information Collection and Use:</p>" +
							"<p>By using this service, you are giving CPS the permission to collect the email address you provide to send you the on-time link to the applet. We see your use of the applet as an indication of your interest in the blood calcium test CPS produces. " +
							"We might use this email address to send you more information about the blood calcium test, Calciulate. " +
							"We are not collecting any of the information you fill out in the applet online.  This information is only temporarily read by your internet browser to perform the calculation and display the result on your device only.</p>",
							 subject: 'Creative Protein Solutions Calciulator'//,
							// text: 'Use this link to gain one-time access to the online Creative Protein Solutions Calciulator tool: ' + req.body.url + "?id=" + uuid +
							// "\n\nInformation Collection and Use\n" +
							// "By using this service, you are giving CPS the permission to collect the email address you provide to send you the on-time link to the applet. We see your use of the applet as an indication of your interest in the blood calcium test CPS produces. " +
							// "We might use this email address to send you more information about the blood calcium test, Calciulate. " +
							// "We are not collecting any of the information you fill out in the applet online.  This information is only temporarily read by your internet browser to perform the calculation and display the result on your device only."
						};


						transporter.sendMail(mailOptions, function(error, info){
							if (error) {
								return res.send(error)
							} else {
								return res.send("An email has been sent to " + req.body.email + " containing a one-time-use link for the Calciulator tool. Please check your spam and/or junk folders if you do not see it in your inbox shortly.")
							}
						  });

					}
				})

			}
		})
	}
	else{
		return res.send("Incomplete Request")
	}
})






app.get('/checkID', (req, res) => {

	console.log("Id: " + req.query.id);

	res.header('Access-Control-Allow-Origin', '*');

	if(req.query.id != undefined){
		sqlQuery("SELECT * FROM newuuids WHERE uuid = ?", [req.query.id], (err, rows) => {
			if(err != null){
				return res.send(err)
			}
			else{

				if(rows.length > 0){
					sqlQuery("DELETE FROM newuuids WHERE uuid = ?", [req.query.id], (err, rows) => {
						if(err != null){
							return res.send(err)
						}
						else{
							return res.send("True");
						}
					})
				}
				else{
					return res.send("False");
				}
			}
		})
	}
	else{
		return res.send("Incomplete Request")
	}
})











app.post('/cow-update', authorizeUser, (req, res) => { //NOT YET BEING VALIDATED
	
	console.log(req.body)
	
	var id = encrypt(String(req.body.id))
	var daysInMilk = encrypt(String(req.body.daysInMilk))
	var dryOffDay = encrypt(String(req.body.dryOffDay))
	var mastitisHistory = encrypt(String(req.body.mastitisHistory))
	var methodOfDryOff = encrypt(String(req.body.methodOfDryOff))
	var dailyMilkAverage = encrypt(String(req.body.dailyMilkAverage))
	var parity = encrypt(String(req.body.parity))
	var reproductionStatus = encrypt(String(req.body.reproductionStatus))
	var numberOfTimesBred = encrypt(String(req.body.numberOfTimesBred))
	var farmBreedingIndex = encrypt(String(req.body.farmBreedingIndex))
	var herdID = encrypt(String(req.body.herdID))
	var userID = encrypt(String(req.header("user-id")))
	var lactationNumber = encrypt(String(req.body.lactationNumber))
	var daysCarriedCalfIfPregnant = encrypt(String(req.body.daysCarriedCalfIfPregnant))
	var projectedDueDate = encrypt(String(req.body.projectedDueDate))
	var current305DayMilk = encrypt(String(req.body.current305DayMilk))
	var currentSomaticCellCount = encrypt(String(req.body.currentSomaticCellCount))
	var linearScoreAtLastTest = encrypt(String(req.body.linearScoreAtLastTest))
	var dateOfLastClinicalMastitis = encrypt(String(req.body.dateOfLastClinicalMastitis))
	var chainVisibleId = encrypt(String(req.body.chainVisibleId))
	var animalRegistrationNoNLID = encrypt(String(req.body.animalRegistrationNoNLID))
	var damBreed = encrypt(String(req.body.damBreed))
	var culled = req.body.culled
	var modifyDate = encrypt(String(req.body.modifyDate))


			if(req.body.id != undefined){
				//SET THIS BELOW AS THE CALLBACK FUNCTION FOR THE QUERY TO DELETE ALL PREVIOUS COWS WITH THE SAME USERID
				sqlQuery("UPDATE cow SET id = ?, daysInMilk = ?, dryOffDay = ?, mastitisHistory = ?, methodOfDryOff = ?, dailyMilkAverage = ?, parity = ?, reproductionStatus = ?, numberOfTimesBred = ?, farmBreedingIndex = ?, lactationNumber = ?, daysCarriedCalfIfPregnant = ?, projectedDueDate = ?, current305DayMilk = ?, currentSomaticCellCount = ?, linearScoreAtLastTest = ?, dateOfLastClinicalMastitis = ?, chainVisibleId = ?, animalRegistrationNoNLID = ?, damBreed = ?, culled = ?, modifyDate = ? WHERE userID = ? AND herdID = ? AND id = ?", [id, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, culled, modifyDate, userID, herdID, id], (err, rows) => {
					if(err != null){
						console.log("ERROR: " + err);
						return res.send(err)
					}
					else{
						console.log("SUCCESS");
						return res.send("Success")
					}
				})
			}
			else{
				return res.send("Request contained no cow data")
			}


	
})








app.post('/herd-update', authorizeUser, (req, res) => { //NOT YET BEING VALIDATED
	
	var id = encrypt(String(req.body.id))
	var location = encrypt(String(req.body.location))
	var milkingSystem = encrypt(String(req.body.milkingSystem))
	var pin = encrypt(String(req.body.pin))
	var userID = encrypt(String(req.header("user-id")))

			
	if(req.body.id != undefined){
		//SET THIS BELOW AS THE CALLBACK FUNTION OF THE QUERY TO DELETE ALL PREVIOUS HERDS WITH THE SAME USERID
		sqlQuery("UPDATE herd SET id = ?, location = ?, milkingSystem = ?, pin = ? WHERE userID = ? AND id = ?", [id, location, milkingSystem, pin, userID, id], (err, rows) => {
			if(err != null){
				return res.send(err)
			}
			else{
				return res.send("Success")
			}
		})
	}
	else{
		return res.send("Request contained no herd data")
	}

})














//FROM HELENA !!!!!!!!!!Based on file that is beeing send from CPS API
app.get("/user-cow", (req, res) => {
	console.log("Fetching cows by userID and herdID")

	if(req.query.userID != null && req.query.herdID != null){
		sqlQuery("SELECT * FROM cow WHERE userID = ? AND herdID = ? AND deleted = ?", [encrypt(req.query.userID), encrypt(req.query.herdID), 0], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{
				var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

				objects.forEach(function(cow){
					if(cow.userID.substring(0, 11) != "depreciated"){
						var cowObject = {
							id: decrypt(cow.id),
							herdID: decrypt(cow.herdID),
							daysInMilk: decrypt(cow.daysInMilk),
							dryOffDay: decrypt(cow.dryOffDay),
							lactationNumber: decrypt(cow.lactationNumber),
							daysCarriedCalfIfPregnant: decrypt(cow.daysCarriedCalfIfPregnant),
							projectedDueDate: decrypt(cow.projectedDueDate),
							current305DayMilk: decrypt(cow.current305DayMilk),
							currentSomaticCellCount: decrypt(cow.currentSomaticCellCount),
							linearScoreAtLastTest: decrypt(cow.linearScoreAtLastTest),
							dateOfLastClinicalMastitis: decrypt(cow.dateOfLastClinicalMastitis),
							chainVisibleId: decrypt(cow.chainVisibleId),
							animalRegistrationNoNLID: decrypt(cow.animalRegistrationNoNLID),
							damBreed: decrypt(cow.damBreed),
							culled: cow.culled,
							modifyDate: decrypt(cow.modifyDate)
						}

						jsonObjects.push(cowObject)
					}
				})

				return res.send(JSON.stringify(jsonObjects))
			}
		})
	}
})

//FROM HELENA
app.get("/user-herd", (req, res) => {
	console.log("Fetching herds by userID")

	if(req.query.userID != null){
		sqlQuery("SELECT * FROM herd WHERE userID = ? AND deleted = ?", [encrypt(req.query.userID), 0], (err, objects) => {
			if(err){
				return res.send("Error: " + err)
			}
			else{
				var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

				objects.forEach(function(herd){
					if(herd.userID.substring(0, 11) != "depreciated"){
						var cowObject = {
							id: decrypt(herd.id),
							location: decrypt(herd.location),
							milkingSystem: decrypt(herd.milkingSystem)
						}

						jsonObjects.push(cowObject)
					}
				})

				return res.send(JSON.stringify(jsonObjects))
			}
		})
	}
})





  //VALIDATION
 const joiUserValidationSchema = joi.object().keys({
	 username: joi.string().min(6).required(),
	 email: joi.string().required().email(),
	 firstName: joi.string(),
	 lastName: joi.string(),
	 password: joi.string().min(6).required(),
	 phone: joi.string(),
	 address1: joi.string(),
	 address2: joi.string().allow(""),
	 city: joi.string(),
	 country: joi.string(),
	 province: joi.string(),
	 province: joi.string(),
	 zipCode: joi.string()
 })
 
 const joiHerdValidationSchema = {
	 //fill out
 }
 
 const joiCowValidationSchema = {
	 //fill out
 }
 
 const joiTestValidationSchema = {
	 //fill out
 }
 
 
 
 



//POST REQUESTS///////////////////////////////////////////////////////////////////////////////////////////


app.post('/herd', authorizeUser, (req, res) => { //NOT YET BEING VALIDATED
	
	var id = encrypt(String(req.body.id))
	var location = encrypt(String(req.body.location))
	var milkingSystem = encrypt(String(req.body.milkingSystem))
	var pin = encrypt(String(req.body.pin))
	var userID = encrypt(String(req.header("user-id")))

			
	if(req.body.id != undefined){
		//SET THIS BELOW AS THE CALLBACK FUNTION OF THE QUERY TO DELETE ALL PREVIOUS HERDS WITH THE SAME USERID
		sqlQuery("INSERT INTO herd (id, location, milkingSystem, pin, userID) VALUES (?, ?, ?, ?, ?)", [id, location, milkingSystem, pin, userID], (err, rows) => {
			if(err != null){
				return res.send(err)
			}
			else{
				return res.send("Success")
			}
		})
	}
	else{
		return res.send("Request contained no herd data")
	}

})

app.post('/cow', authorizeUser, (req, res) => { //NOT YET BEING VALIDATED
	
	console.log(req.body)
	
	var id = encrypt(String(req.body.id))
	var daysInMilk = encrypt(String(req.body.daysInMilk))
	var dryOffDay = encrypt(String(req.body.dryOffDay))
	var mastitisHistory = encrypt(String(req.body.mastitisHistory))
	var methodOfDryOff = encrypt(String(req.body.methodOfDryOff))
	var dailyMilkAverage = encrypt(String(req.body.dailyMilkAverage))
	var parity = encrypt(String(req.body.parity))
	var reproductionStatus = encrypt(String(req.body.reproductionStatus))
	var numberOfTimesBred = encrypt(String(req.body.numberOfTimesBred))
	var farmBreedingIndex = encrypt(String(req.body.farmBreedingIndex))
	var herdID = encrypt(String(req.body.herdID))
	var userID = encrypt(String(req.header("user-id")))
	var lactationNumber = encrypt(String(req.body.lactationNumber))
	var daysCarriedCalfIfPregnant = encrypt(String(req.body.daysCarriedCalfIfPregnant))
	var projectedDueDate = encrypt(String(req.body.projectedDueDate))
	var current305DayMilk = encrypt(String(req.body.current305DayMilk))
	var currentSomaticCellCount = encrypt(String(req.body.currentSomaticCellCount))
	var linearScoreAtLastTest = encrypt(String(req.body.linearScoreAtLastTest))
	var dateOfLastClinicalMastitis = encrypt(String(req.body.dateOfLastClinicalMastitis))
	var chainVisibleId = encrypt(String(req.body.chainVisibleId))
	var animalRegistrationNoNLID = encrypt(String(req.body.animalRegistrationNoNLID))
	var damBreed = encrypt(String(req.body.damBreed))
	var culled = req.body.culled
	var modifyDate = encrypt(String(req.body.modifyDate))

	// sqlQuery("DELETE FROM cow WHERE userID = ?", [userID.substring(0, 60)], (err, rows) => {

	// 	if(err != null){
	// 		return res.send(err)
	// 	}
	// 	else{
			if(req.body.id != undefined){
				//SET THIS BELOW AS THE CALLBACK FUNCTION FOR THE QUERY TO DELETE ALL PREVIOUS COWS WITH THE SAME USERID
				sqlQuery("INSERT INTO cow (id, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, herdID, userID, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, culled, modifyDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, herdID, userID, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, culled, modifyDate], (err, rows) => {
					if(err != null){
						return res.send(err)
					}
					else{
						return res.send("Success")
					}
				})
			}
			else{
				return res.send("Request contained no cow data")
			}
	// 	}

	// })

	
})

app.post('/test', authorizeUser, (req, res) => { //NOT YET BEING VALIDATED
	
	console.log("test body: " + req.body)
	
	var date = encrypt(String(req.body.date))
	var dataType = encrypt(String(req.body.dataType))
	var runtime = encrypt(String(req.body.runtime))
	var testType = encrypt(String(req.body.testType))
	var units = encrypt(String(req.body.units))
	var value = encrypt(String(req.body.value))
	var cowID = encrypt(String(req.body.cowID))
	var herdID = encrypt(String(req.body.herdID))
	var userID = encrypt(String(req.header("user-id")))
	var milkFever = encrypt(String(req.body.milkFever))
	var followUpNum = encrypt(String(req.body.followUpNum))
	var testID = encrypt(String(req.body.testID))

	// sqlQuery("DELETE FROM test WHERE userID = ?", [userID.substring(0, 60)], (err, rows) => {


	// 	if(err != null){
	// 		return res.send(err)
	// 	}
	// 	else{
			if(req.body.value != undefined){
				//SET THIS AS THE CALLBACK FUNCTION FOR THE QUERY TO DELETE ALL PREVIOUS TESTS WITH THE SAME USERID
				sqlQuery("INSERT INTO test (date, testType, units, value, cowID, userID, herdID, milkFever, followUpNum, testID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [date, testType, units, value, cowID, userID, herdID, milkFever, followUpNum, testID], (err, rows) => {
					if(err != null){
						return res.send(err)
					}
					else{
						return res.send("Success")
					}
				})
			}
			else{
				return res.send("Success")
			}
// 		}

// 	})
	
})

//!!!!!!!!!!Based on file that is beeing send from CPS API
app.post('/cow-file', (req, res) => { //NOT YET BEING VALIDATED
	
	var cowArray = req.body



	sqlQuery("INSERT INTO herd (id, location, milkingSystem, pin, userID) VALUES (?, ?, ?, ?, ?)", [encrypt(String(cowArray[0].herdID)), "", "", "", encrypt(String(req.header("user-id")))], (err, rows) => {
		if(err != null){
			return res.send(err)
		}
		else{
			

			async.forEachOf(cowArray, function(object, key, callback) {
				var id = encrypt(String(object.id))
				var herdID = encrypt(String(object.herdID))
				var daysInMilk = encrypt(String(object.daysInMilk))
				var dryOffDay = encrypt(String(object.dryOffDay))
				var lactationNumber = encrypt(String(object.lactationNumber))
				var daysCarriedCalfIfPregnant = encrypt(String(object.daysCarriedCalfIfPregnant))
				var projectedDueDate = encrypt(String(object.projectedDueDate))
				var current305DayMilk = encrypt(String(object.current305DayMilk))
				var currentSomaticCellCount = encrypt(String(object.currentSomaticCellCount))
				var linearScoreAtLastTest = encrypt(String(object.linearScoreAtLastTest))
				var dateOfLastClinicalMastitis = encrypt(String(object.dateOfLastClinicalMastitis))
				var chainVisibleId = encrypt(String(object.chainVisibleId))
				var animalRegistrationNoNLID = encrypt(String(object.animalRegistrationNoNLID))
				var damBreed = encrypt(String(object.damBreed))
				var modifyDate = encrypt(String(object.modifyDate))
				var userID = encrypt(String(req.header("user-id")))
	
				herdIDG = herdID;
				userIDG = userID;
				
					//query from query string
					sqlQuery("INSERT INTO cow (id, herdID, daysInMilk, dryOffDay, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount, "
								+ "linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, userID, modifyDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
							[id, herdID, daysInMilk, dryOffDay, lactationNumber, daysCarriedCalfIfPregnant, projectedDueDate, current305DayMilk, currentSomaticCellCount,
							linearScoreAtLastTest, dateOfLastClinicalMastitis, chainVisibleId, animalRegistrationNoNLID, damBreed, userID, modifyDate], (err, objects) => {
						if(err != null){
							return res.send(err)
						}
						else{
							return ("Finished creating cow")
						}
					})
					
				return callback()
	
			}, function(err){
		
				console.log("Error in function")
		
				if(err){
					//handle the error if the query throws an error
					console.log("Error")
					return res.send(err)
				}else{
					//whatever you wanna do after all the iterations are done
					console.log("Success")
					return res.send("Success")
				}
			});	
		

		}
	})
}
	
)


//PUT REQUESTS///////////////////////////////////////////////////////////////////////////////////////////
//Based on file that is beeing send from CPS API
app.put("/cow", (req, res) => {

	var cowArray = req.body

		async.forEachOf(cowArray, function(object, key, callback) {
			var id = encrypt(String(object.id))
			var herdID = encrypt(String(object.herdID))
			var daysInMilk = object.daysInMilk == null ? null : encrypt(String(object.daysInMilk))
			var dryOffDay = object.dryOffDay == null ? null : encrypt(String(object.dryOffDay))
			var lactationNumber = object.lactationNumber == null ? null : encrypt(String(object.lactationNumber))
			var daysCarriedCalfIfPregnant = object.daysCarriedCalfIfPregnant == null ? null : encrypt(String(object.daysCarriedCalfIfPregnant))
			var projectedDueDate = object.projectedDueDate == null ? null : encrypt(String(object.projectedDueDate))
			var current305DayMilk = object.current305DayMilk == null ? null : encrypt(String(object.current305DayMilk))
			var currentSomaticCellCount = object.currentSomaticCellCount == null ? null : encrypt(String(object.currentSomaticCellCount))
			var linearScoreAtLastTest = object.linearScoreAtLastTest == null ? null : encrypt(String(object.linearScoreAtLastTest))
			var dateOfLastClinicalMastitis = object.dateOfLastClinicalMastitis == null ? null : encrypt(String(object.dateOfLastClinicalMastitis))
			var chainVisibleId = object.chainVisibleId == null ? null : encrypt(String(object.chainVisibleId))
			var animalRegistrationNoNLID = object.animalRegistrationNoNLID == null ? null : encrypt(String(object.animalRegistrationNoNLID))
			var damBreed = object.damBreed == null ? null : encrypt(String(object.damBreed))
			var culled = object.culled
			var modifyDate = encrypt(String(object.modifyDate))
			var userID = encrypt(String(req.header("user-id")))
			
				//query from query string
				sqlQuery("UPDATE cow SET daysInMilk = CASE WHEN ? IS NOT NULL THEN ? ELSE daysInMilk END, dryOffDay = CASE WHEN ? IS NOT NULL THEN ? ELSE dryOffDay END, "
						+ "lactationNumber = CASE WHEN ? IS NOT NULL THEN ? ELSE lactationNumber END, daysCarriedCalfIfPregnant = CASE WHEN ? IS NOT NULL THEN ? ELSE daysCarriedCalfIfPregnant END, "
						+ "projectedDueDate = CASE WHEN ? IS NOT NULL THEN ? ELSE projectedDueDate END, current305DayMilk = CASE WHEN ? IS NOT NULL THEN ? ELSE current305DayMilk END, "
						+ "currentSomaticCellCount = CASE WHEN ? IS NOT NULL THEN ? ELSE currentSomaticCellCount END, linearScoreAtLastTest = CASE WHEN ? IS NOT NULL THEN ? ELSE linearScoreAtLastTest END, "
						+ "dateOfLastClinicalMastitis = CASE WHEN ? IS NOT NULL THEN ? ELSE dateOfLastClinicalMastitis END, chainVisibleId = CASE WHEN ? IS NOT NULL THEN ? ELSE chainVisibleId END, "
						+ "animalRegistrationNoNLID = CASE WHEN ? IS NOT NULL THEN ? ELSE animalRegistrationNoNLID END, damBreed = CASE WHEN ? IS NOT NULL THEN ? ELSE damBreed END, "
						+ "culled = ?, modifyDate = ? WHERE userID = ? && id = ? && herdID = ?", 
						[daysInMilk, daysInMilk, dryOffDay, dryOffDay, lactationNumber, lactationNumber, daysCarriedCalfIfPregnant, daysCarriedCalfIfPregnant, projectedDueDate, projectedDueDate, 
							current305DayMilk, current305DayMilk, currentSomaticCellCount, currentSomaticCellCount, linearScoreAtLastTest, linearScoreAtLastTest, dateOfLastClinicalMastitis, 
							dateOfLastClinicalMastitis, chainVisibleId, chainVisibleId, animalRegistrationNoNLID, animalRegistrationNoNLID, damBreed, damBreed, culled, modifyDate, userID, id, herdID], (err, objects) => {
					if(err != null){
						return res.send(err)
					}
					else{
						return ("Finished updating cow")
					}
				})
				
			return callback()

		}, function(err){
	
			console.log("Error in function")
	
			if(err){
				//handle the error if the query throws an error
				console.log("Error")
				return res.send(err)
			}else{
				//whatever you wanna do after all the iterations are done
				console.log("Success")
				return res.send("Success")
			}
		});			
})

app.put("/cow-culled", (req, res) => {

	var cowArray = req.body

		async.forEachOf(cowArray, function(object, key, callback) {
			var id = encrypt(String(object.id))
			var herdID = encrypt(String(object.herdID))
			var culled = object.culled
			var userID = encrypt(String(req.header("user-id")))
			
				//query from query string
				sqlQuery("UPDATE cow SET culled = ? WHERE userID = ? && id = ? && herdID = ?", 
						[culled, userID, id, herdID], (err, objects) => {
					if(err != null){
						return res.send(err)
					}
					else{
						return ("Finished setting cow to culled")
					}
				})
				
			return callback()

		}, function(err){
	
			console.log("Error in function")
	
			if(err){
				//handle the error if the query throws an error
				console.log("Error")
				return res.send(err)
			}else{
				//whatever you wanna do after all the iterations are done
				console.log("Success")
				return res.send("Success")
			}
		});			
})

 
 
 //AUTHENTIFICATION///////////////////////////////////////////////////////////////////////////////////////////
 
 app.post('/user/register', (req, res) => { 
	console.log(req.body)
	
	joi.validate(req.body, joiUserValidationSchema, (err, value) => {
		if(err){
			return res.send(err.details[0].message)
		}
		else{
			var username = req.body.username
			var email = req.body.email
			var firstName = req.body.firstName
			var lastName = req.body.lastName
			var phone = req.body.phone
			var address1 = req.body.address1
			var address2 = req.body.address2
			var city = req.body.city
			var country = req.body.country
			var province = req.body.province
			var zipCode = req.body.zipCode
			bcrypt.hash(req.body.password, 10, function(err, hashPass){
				if(err){
					console.log("error while hashing password: " + err)
					return res.send(err)	
				}
		
				else{
		
					bcrypt.hash(email, 10, function(err, hashID){
						if(err){
							console.log("error creating userID: " + err)
							return res.send(err)	
						}
						else{
							sqlQuery("SELECT * FROM user WHERE username = ? OR email = ? OR phone = ?", [username, email, phone], (err, objects) => {
				
								if(err){
									res.send("Server Error")
									return
								}
						
								if(objects[0] != undefined){
									res.send("Username, Email or Phone Number has Already Been Used")
									return
								}
								else{
									//save user to database
									sqlQuery("INSERT INTO user (username, email, password, userID, firstName, lastName, phone, address1, address2, city, country, province, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [username, email, hashPass, hashID, firstName, lastName, phone, address1, address2, city, country, province, zipCode], (err, objects) =>{
										if(err){
											res.send("Server Error")
											return
										}
						
										res.header('user-id', hashID).send("User created: " + username)
									})
								}
							})
						}
					}) //use the email since you know it is going to be unique for each user
		
		
				}
			})
			//use hashSync so that it is synchronous and finished the hash before the next code executes - implements a callback function itself
		}
	})

 })


 app.post('/user/delete', (req, res) => { 
	console.log(req.body)
	var userID = String(req.header("user-id"))

	console.log("\n\n" + userID + "\n\n")

	sqlQuery("DELETE FROM user WHERE userID = ?", [userID], (err) => {
				
		if(err){
			res.send("Server Error")
			return
		}
		else{
			res.send("Success")
			return
		}
	})

 })

 
 
  app.post('/user/login', (req, res) => {
	
	var email = req.body.email
	var password = req.body.password
	var token = null


	var object = sqlQuery("SELECT * FROM user WHERE email = ?", [email], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

		//console.log(objects[0])
		//console.log(objects[0].password)

		if(err != null){
			//console.log("got here 1")
			//res.send("Server Error")
			return console.log("ERROR : " + err)
		}

		if(objects[0] == undefined){ //email did not match - user not in database
			//console.log("got here 2")
			return res.send("Username or Password is Incorrect")
		}
		
		bcrypt.compare(password, objects[0].password, function(err, response){

			console.log(response)

			if(err){
				console.log(err)
				return res.send("error comparing password with stored hashed password: " + err)
			}
			else if(response == true){
				//passwords match
				//create and assign JWT
				console.log("passwords match")

				token = jwt.sign({_id: objects[0].userID}, process.env.TOKEN_SECRET, {expiresIn: '6h'}) //change the id from username to the userID
				return res.header('auth-token', token).header('user-id', objects[0].userID).header('admin-flag', objects[0].admin).send("Logged In")
			}
			else{
				//passwords dont match
				console.log("passwords dont match")

				return res.send("Username or Passoword is Incorrect")
			}
		})
	
		//at this point it will have been returned if the login was not succesful
		//res.send("logged in")
	
		//console.log("got here 4")
	

	})

 })



 app.post('/user/logout', authorizeUser, (req, res) => {
	
	const token = req.header("auth-token")

	sqlQuery("INSERT INTO blacklistedjwts (jwt, deleteNext) VALUES (?, ?)", [token, "0"], (err, rows) => {
		if(err != null){
			return res.send(err)
		}
		else{
			return res.send("Success")
		}
	})

 })


 


 app.get("/user/authenticate", authorizeUser, (req, res) => {
	//sends back "Access Denied" if JWT is not valid/null and "Authenticated" if JWT is valid
	res.send("Authenticated")
	
})
 
 
 
 
 
 //HELPER FUNCTIONS//////////////////////////////////////////////////////////////////////////////////////////
 
function sqlQuery(query, arguments, callback){
	getConnection().query(query, arguments, (err, rows, fields) => {

		if(err != null){
			callback(err, null)
		}
		
		callback(null, rows)
	})
}

 const pool = mysql.createPool({ //connection pool 
	 connectionLimit: 10,
	 host: 'us-cdbr-iron-east-02.cleardb.net',
   	 user: 'b97ac0ec9c55a7',
	 password: process.env.DB_PASSWORD, //find how to do this properly
	 database: 'heroku_bcd0fd1226bfc07'
 })
 
 function getConnection(){
	 return pool
 }
 
 function authorizeUser(req, res, next){

	 const token = req.header('auth-token')
	 if(!token){
		return res.send("Access Denied")
	 }
	 
	 try{
		 const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		 
		 sqlQuery("SELECT * FROM blacklistedjwts WHERE jwt = ?", token, (err, rows) => {

			console.log(rows[0])

			if(err != null){ 
				console.log("error case")
				return res.send("Access Denied")
			}	
			else if(rows[0] != undefined){
				console.log("rows undefined case")
				return res.send("Invalid Token")
			}
			else{
				req.user = verified //this sets req.user to the payload id from the JWT - this is to identify which user is making the request
				next() //proceed to the next middleware in the route
			}		
		})

	 }catch(err){
		 console.log("GOT HERE 2")
		 return res.send("Invalid Token")
	 }
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


const PORT = process.env.PORT || 3000

//using PORT to run on Heroku. Use localhost for any local testing
app.listen(PORT, () => {
	console.log("Server is up and listening on " + PORT)


	setInterval(function() { //clear blacklistedjwts table every hour



		sqlQuery("DELETE FROM blacklistedjwts WHERE deleteNext = ?", "1", (err, rows) => {


			if(err != null){
				console.log("Error deleting from blacklistedjwts table")
			}
			else{
				console.log("Success deleting from blacklistedjwts table")

				sqlQuery("SELECT * FROM blacklistedjwts WHERE deleteNext = ?", "0", (err, rows) => { //set all jwts blacklisted with deleteNext = 0 to deleteNext = 1

					if(err != null){
						console.log("Error setting deleteNext = 1 on jwts in blacklistedjwts table")
					}
					else{

						rows.forEach(function(jwt){


							sqlQuery("UPDATE blacklistedjwts SET deleteNext = ? WHERE jwt = ?", ["1", jwt["jwt"]], (err, rows) => { //set all jwts blacklisted with deleteNext = 0 to deleteNext = 1

								if(err != null){
									console.log("Error setting deleteNext = 1 on jwts in blacklistedjwts table")
								}
								else{
									console.log("Success setting deleteNext = 1 on jwts in blacklistedjwts table")
								}
						
							})

						})

					}
			
				})

			}
	
		})





	}, 3600 * 1000) //3600 seconds = 1h (x 1000 because it is measured in miliseconds)
})