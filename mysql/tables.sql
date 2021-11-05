DROP TABLE IF EXISTS blacklistedjwts;
DROP TABLE IF EXISTS collectedemails;
DROP TABLE IF EXISTS cow;
DROP TABLE IF EXISTS herd;
DROP TABLE IF EXISTS newuuids;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS blacklistedjwts (
  jwt VARCHAR(500),
  deleteNext VARCHAR(1)
);

CREATE TABLE IF NOT EXISTS collectedemails (
  email VARCHAR(100) NOT NULL,
  visits INT(11) DEFAULT 1,
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS cow (
  id VARCHAR(128) NOT NULL,
  daysInMilk VARCHAR(45),
  dryOffDay VARCHAR(45),
  mastitisHistory VARCHAR(45),
  methodOfDryOff VARCHAR(45),
  dailyMilkAverage VARCHAR(45),
  parity VARCHAR(45),
  reproductionStatus VARCHAR(45),
  numberOfTimesBred VARCHAR(45),
  farmBreedingIndex VARCHAR(45),
  herdID VARCHAR(128) NOT NULL,
  userID VARCHAR(140) NOT NULL,
  lactationNumber VARCHAR(45),
  daysCarriedCalfIfPregnant VARCHAR(45),
  projectedDueDate VARCHAR(45),
  current305DayMilk VARCHAR(45),
  currentSomaticCellCount VARCHAR(45),
  linearScoreAtLastTest VARCHAR(45),
  dateOfLastClinicalMastitis VARCHAR(45),
  chainVisibleId VARCHAR(45),
  animalRegistrationNoNLID VARCHAR(45),
  damBreed VARCHAR(45),
  culled TINYINT(1) NOT NULL DEFAULT 0,
  modifyDate VARCHAR(45),
  deleted INT(11) DEFAULT 0,
  PRIMARY KEY (id, herdID, userID)
);

CREATE TABLE IF NOT EXISTS herd (
  id VARCHAR(128) NOT NULL,
  location VARCHAR(45),
  milkingSystem VARCHAR(45),
  pin VARCHAR(45),
  userID VARCHAR(140) NOT NULL,
  deleted INT(11) DEFAULT 0,
  PRIMARY KEY (id, userID)
);

CREATE TABLE IF NOT EXISTS newuuids (
  uuid VARCHAR(100) NOT NULL,
  PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS test (
  date VARCHAR(45),
  testType VARCHAR(45),
  units VARCHAR(45),
  value VARCHAR(45),
  cowID VARCHAR(128) NOT NULL,
  userID VARCHAR(140) NOT NULL,
  milkFever VARCHAR(45),
  testID VARCHAR(128) NOT NULL,
  followUpNum VARCHAR(45),
  herdID VARCHAR(140) NOT NULL,
  deleted VARCHAR(45) DEFAULT 0,
  PRIMARY KEY (cowID, userID, testID, herdID)
);

CREATE TABLE IF NOT EXISTS user (
  username VARCHAR(45),
  email VARCHAR(45),
  password VARCHAR(128),
  userID VARCHAR(140),
  address1 VARCHAR(45),
  address2 VARCHAR(45),
  city VARCHAR(45),
  country VARCHAR(45),
  firstName VARCHAR(45),
  lastName VARCHAR(45),
  phone VARCHAR(45),
  province VARCHAR(45),
  zip VARCHAR(45),
  admin INT(11) DEFAULT 0
);