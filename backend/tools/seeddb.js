const db = require("../src/services/database");
const {
  usersTable,
  authsTable,
  postsTable,
  usersLikesTable,
} = require("./tables-model");

const alterTableUsers = `ALTER TABLE users ADD CONSTRAINT users_fk0 FOREIGN KEY (auth_id) REFERENCES auths(auth_id);`;
const alterTablePosts = `ALTER TABLE posts ADD CONSTRAINT posts_fk0 FOREIGN KEY (author_id) REFERENCES users(user_id);`;
const alterUsersLikesUsers = `ALTER TABLE users_likes ADD CONSTRAINT users_likes_fk0 FOREIGN KEY (user_id) REFERENCES users(user_id);`;
const alterUsersLikesPosts = `ALTER TABLE users_likes ADD CONSTRAINT users_likes_fk1 FOREIGN KEY (post_id) REFERENCES posts(post_id);`;
const createDefaultUserAuth = `INSERT IGNORE INTO auths (auth_lvl, auth_label) VALUES (0, "default");`;
const createAdminUserAuth = `INSERT IGNORE INTO auths (auth_lvl, auth_label) VALUES (1, "admin");`;

db.getConnection(function (err, conn) {
  if (err) {
    console.error("Seeddb failed to get db connection: ", err);
    process.exit(1);
  }
  console.log("Successfully logged into database!");

  const usersTableSeedPromise = new Promise((resolve) => {
    conn.query(usersTable, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  usersTableSeedPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const authsTableSeedPromise = new Promise((resolve) => {
    conn.query(authsTable, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  authsTableSeedPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const postsTableSeedPromise = new Promise((resolve) => {
    conn.query(postsTable, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  postsTableSeedPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const usersLikesTableSeedPromise = new Promise((resolve) => {
    conn.query(usersLikesTable, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  usersLikesTableSeedPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const alterTableUsersPromise = new Promise((resolve) => {
    conn.query(alterTableUsers, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  alterTableUsersPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const alterTablePostsPromise = new Promise((resolve) => {
    conn.query(alterTablePosts, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  alterTablePostsPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const alterUsersLikesUsersPromise = new Promise((resolve) => {
    conn.query(alterUsersLikesUsers, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  alterUsersLikesUsersPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const alterUsersLikesPostsPromise = new Promise((resolve) => {
    conn.query(alterUsersLikesPosts, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  alterUsersLikesPostsPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const createDefaultUserAuthPromise = new Promise((resolve) => {
    conn.query(createDefaultUserAuth, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  createDefaultUserAuthPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });

  const createAdminUserAuthPromise = new Promise((resolve) => {
    conn.query(createAdminUserAuth, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  createAdminUserAuthPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });
});
