DROP TABLE IF EXISTS strip_tests;
DROP TABLE IF EXISTS cows;
DROP TABLE IF EXISTS herds;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS blacklisted_jwts;

CREATE TABLE IF NOT EXISTS blacklisted_jwts (
  token VARCHAR(768) NOT NULL,
  expiration INT NOT NULL,
  PRIMARY KEY (token)
);

CREATE EVENT IF NOT EXISTS delete_jwts
ON SCHEDULE EVERY 1 HOUR
DO
  DELETE FROM blacklisted_jwts
  WHERE expiration < UNIX_TIMESTAMP(NOW())

CREATE TABLE IF NOT EXISTS users (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  main_address VARCHAR(255) NOT NULL,
  secondary_address VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  zip_code VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  admin_flag TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS herds (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  herd_id INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  milking_system VARCHAR(255) NOT NULL,
  pin INT NOT NULL,
  modify_date DATETIME NOT NULL,
  sync_flag TINYINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT NOT NULL DEFAULT 0,
  user_id BINARY(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS cows (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  cow_id INT NOT NULL,
  days_in_milk INT NOT NULL,
  dry_off_day INT NOT NULL,
  mastitis_history INT NOT NULL,
  method_of_dry_off VARCHAR(255) NOT NULL,
  daily_milk_average INT NOT NULL,
  parity INT NOT NULL,
  reproduction_status VARCHAR(255) NOT NULL,
  number_of_times_bred INT NOT NULL,
  farm_breeding_index INT NOT NULL,
  lactation_number INT NOT NULL,
  days_carried_calf_if_pregnant INT NOT NULL,
  projected_due_date VARCHAR(255) NOT NULL,
  current_305_day_milk INT NOT NULL,
  current_somatic_cell_count INT NOT NULL,
  linear_score_at_last_test INT NOT NULL,
  date_of_last_clinical_mastitis VARCHAR(255) NOT NULL,
  chain_visible_id INT NOT NULL,
  animal_registration_no_nlid INT NOT NULL,
  dam_breed VARCHAR(255) NOT NULL,
  culled TINYINT NOT NULL DEFAULT 0,
  modify_date DATETIME NOT NULL,
  sync_flag TINYINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT NOT NULL DEFAULT 0,
  herd_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (herd_id) REFERENCES herds (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS strip_tests (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  strip_test_id INT NOT NULL,
  test_type VARCHAR(255) NOT NULL,
  units VARCHAR(255) NOT NULL,
  millivolts FLOAT NOT NULL,
  result FLOAT NOT NULL,
  milk_fever TINYINT NOT NULL,
  follow_up_num INT NOT NULL,
  sync_flag TINYINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT NOT NULL DEFAULT 0,
  cow_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cow_id) REFERENCES cows (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);