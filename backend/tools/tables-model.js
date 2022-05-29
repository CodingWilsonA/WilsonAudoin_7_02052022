let usersTable = `CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
	first_name varchar(50),
	last_name varchar(50),
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	auth_id INT NOT NULL,
	PRIMARY KEY (user_id)
  );`;

let authsTable = `CREATE TABLE IF NOT EXISTS auths (
  auth_id INT NOT NULL AUTO_INCREMENT,
	auth_lvl INT NOT NULL,
	auth_label varchar(50) NOT NULL,
	PRIMARY KEY (auth_id)
);`;

let postsTable = `CREATE TABLE IF NOT EXISTS posts (
  post_id INT NOT NULL AUTO_INCREMENT,
	content TEXT NOT NULL,
	img_url varchar(255),
	likes INT NOT NULL DEFAULT '0',
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL,
	author_id INT NOT NULL,
	PRIMARY KEY (post_id)
);`;

let usersLikesTable = `CREATE TABLE IF NOT EXISTS users_likes (
  user_id INT NOT NULL,
	post_id INT NOT NULL
);`;

module.exports = { usersTable, authsTable, postsTable, usersLikesTable };
