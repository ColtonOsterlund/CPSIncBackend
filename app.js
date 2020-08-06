//load our app server using express

const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require('crypto')
const async = require('async')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('short'));
dotenv.config()


//GET REQUESTS/////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", authorizeUser, (req, res) => {
	console.log("Root Request")
	
	res.send("ROOT")
	
})



app.get("/herd", authorizeUser, (req, res) => {
		console.log("Fetching ALL Herds")

		if(req.query.herdID != null){
			//query from query string
			sqlQuery("SELECT * FROM herd WHERE herdID = ?", encrypt(req.query.herdID), (err, objects) => {
				if(err){
					return res.send("Error: " + err)
				}
				else{
					var jsonObjects = [] //empty array to put all herds into to then be turned to a JSON object

					objects.forEach(function(herd){
						var herdObject = {
							id: decrypt(herd.id),
							location: decrypt(herd.location),
							milkingSystem: decrypt(herd.milkingSystem),
							pin: decrypt(herd.pin)
						}

						jsonObjects.push(herdObject)
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

						console.log(herd.id)

						var herdObject = {
							id: decrypt(herd.id),
							location: decrypt(herd.location),
							milkingSystem: decrypt(herd.milkingSystem),
							pin: decrypt(herd.pin)
						}

						jsonObjects.push(herdObject)
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
							herdID: decrypt(cow.herdID)
						}

						jsonObjects.push(cowObject)
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
							herdID: decrypt(cow.herdID)
						}

						jsonObjects.push(cowObject)
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
							herdID: decrypt(cow.herdID)
						}

						jsonObjects.push(cowObject)
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
						var cowObject = {
							date: decrypt(test.date),
							dataType: decrypt(test.dataType),
							runtime: decrypt(test.runtime),
							testType: decrypt(test.testType),
							units: decrypt(test.units),
							value: decrypt(test.value),
							cowID: decrypt(test.cowID)
						}

						jsonObjects.push(testObject)
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
						var testObject = {
							date: decrypt(test.date),
							dataType: decrypt(test.dataType),
							runtime: decrypt(test.runtime),
							testType: decrypt(test.testType),
							units: decrypt(test.units),
							value: decrypt(test.value),
							cowID: decrypt(test.cowID)
						}

						jsonObjects.push(testObject)
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

app.post('/sync', authorizeUser, (req, res) => {

	var userID = encrypt(String(req.header("user-id")))

	sqlQuery("DELETE FROM herd WHERE userID = ?;" ["depreciated" + userID], (err, rows) => {

		if(err != null){
			return res.send(err)
		}

		else{
			console.log("had no errors");
			sqlQuery("DELETE FROM cow WHERE userID = ?", ["depreciated" + userID], (err, rows) => {

				if(err != null){
					return res.send(err)
				}
		
				else{
					sqlQuery("DELETE FROM test WHERE userID = ?", ["depreciated" + userID], (err, rows) => {

						if(err != null){
							return res.send(err)
						}
				
						else{
							var syncObjects = req.body

							async.forEachSeries(syncObjects, function(object){
								console.log(object.objectType);

							}, function(err){
								if(err){
								  //handle the error if the query throws an error
								  console.log("Error")
								}else{
								  //whatever you wanna do after all the iterations are done
								  console.log("Success")
								}
							});
							
							// syncObjects.forEach(function(object){
							// 	if(object.objectType == "Herd"){
							// 		//add Herd to DB
							// 		var id = encrypt(String(req.body.id))
							// 		var location = encrypt(String(req.body.location))
							// 		var milkingSystem = encrypt(String(req.body.milkingSystem))
							// 		var pin = encrypt(String(req.body.pin))
							// 		var userID = encrypt(String(req.header("user-id")))

							// 	}
							// 	else if(object.objectType == "Cow"){
							// 		//add Cow to DB
							// 	}
							// 	else if(object.objectType == "Test"){
							// 		//add Test to DB
							// 	}
							// })

						}
				
					})
				}
		
			})
		}

	})

})





app.post('/herd', authorizeUser, (req, res) => { //NOT YET BEING VALIDATED
	
	console.log(req.body)
	
	var id = encrypt(String(req.body.id))
	var location = encrypt(String(req.body.location))
	var milkingSystem = encrypt(String(req.body.milkingSystem))
	var pin = encrypt(String(req.body.pin))
	var userID = encrypt(String(req.header("user-id")))

	console.log(userID.substring(0, 59))

	sqlQuery("DELETE FROM herd WHERE userID = ?", [userID], (err, rows) => {

		if(err != null){
			return res.send(err)
		}

		else{
			
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
				return res.send("Success")
			}
		}

	})

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

	// sqlQuery("DELETE FROM cow WHERE userID = ?", [userID.substring(0, 60)], (err, rows) => {

	// 	if(err != null){
	// 		return res.send(err)
	// 	}
	// 	else{
			if(req.body.id != undefined){
				//SET THIS BELOW AS THE CALLBACK FUNCTION FOR THE QUERY TO DELETE ALL PREVIOUS COWS WITH THE SAME USERID
				sqlQuery("INSERT INTO cow (id, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, herdID, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, daysInMilk, dryOffDay, mastitisHistory, methodOfDryOff, dailyMilkAverage, parity, reproductionStatus, numberOfTimesBred, farmBreedingIndex, herdID, userID], (err, rows) => {
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
	var userID = encrypt(String(req.header("user-id")))
	

	// sqlQuery("DELETE FROM test WHERE userID = ?", [userID.substring(0, 60)], (err, rows) => {


	// 	if(err != null){
	// 		return res.send(err)
	// 	}
	// 	else{
			if(req.body.value != undefined){
				//SET THIS AS THE CALLBACK FUNCTION FOR THE QUERY TO DELETE ALL PREVIOUS TESTS WITH THE SAME USERID
				sqlQuery("INSERT INTO test (date, dataType, runtime, testType, units, value, cowID, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [date, dataType, runtime, testType, units, value, cowID, userID], (err, rows) => {
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
							sqlQuery("SELECT * FROM user WHERE username = ? OR email = ?", [username, email], (err, objects) => {
				
								if(err){
									res.send("Server Error")
									return
								}
						
								if(objects[0] != undefined){
									res.send("Username or Email has Already Been Used")
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
				return res.header('auth-token', token).header('user-id', objects[0].userID).send("Logged In")
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

	console.log("GOT HERE 1")

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
	var cipher = crypto.createCipher('aes-256-ctr', process.env.ENCRYPTION_KEY)
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
 }

 function decrypt(text){
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