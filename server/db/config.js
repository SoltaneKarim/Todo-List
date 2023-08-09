const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      task VARCHAR(255),
      done BOOLEAN NOT NULL DEFAULT false

      );`)
      .error(err => {
        console.log(err);
      });
    };
    
    
    // done INT NOT NULL DEFAULT 0