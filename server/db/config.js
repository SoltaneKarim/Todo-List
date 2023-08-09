const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS tableName (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      column1 VARCHAR(255),
      column2 INT NOT NULL DEFAULT 0
    );`)
    .error(err => {
      console.log(err);
    });
};