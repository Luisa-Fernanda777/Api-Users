import db from '../database/database.js';
import bcrypt from 'bcrypt';

const User = {};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

User.createUser = (userData, callback) => {
  hashPassword(userData.password)
    .then((hashedPassword) => {
      userData.password = hashedPassword;
      db.query('INSERT INTO users SET ?', userData, (error, results, fields) => {
        if (error) return callback(error, null);
        return callback(null, results);
      });
    })
    .catch((error) => {
      return callback(error, null);
    });
};

User.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', (error, results, fields) => {
    if (error) return callback(error, null);
    return callback(null, results);
  });
};

User.getUserById = (userId, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', userId, (error, results, fields) => {
    if (error) return callback(error, null);
    if (results.length === 0) return callback(null, null); 
    return callback(null, results[0]);
  });
};

User.updateUser = (userId, userData, callback) => {
  hashPassword(userData.password)
    .then((hashedPassword) => {
      userData.password = hashedPassword;
      db.query('UPDATE users SET ? WHERE id = ?', [userData, userId], (error, results, fields) => {
        if (error) return callback(error, null);
        return callback(null, results);
      });
    })
    .catch((error) => {
      return callback(error, null);
    });
};

User.deleteUser = (userId, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [userId], (error, results, fields) => {
    if (error) return callback(error, null);
    return callback(null, results);
  });
};

User.getUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', username, (error, results, fields) => {
    if (error) return callback(error, null);
    if (results.length === 0) return callback(null, null); 
    return callback(null, results[0]);
});
};

export default User;