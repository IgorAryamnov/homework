const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("database.db");
database.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

module.exports = {
  async getUsers() {
    try {
      const users = await new Promise((resolve, reject) => {
        database.all("SELECT * FROM users", [], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
      return users;
    } catch (err) {
      return null;
    }
  },

  async addUser(user) {
    try {
      const lastID = await new Promise((resolve, reject) => {
        database.run(
          "INSERT INTO users (name,age) VALUES (?,?)",
          [user.name, user.age],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
      return { id: lastID, ...user };
    } catch (err) {
      return null;
    }
  },

  async updateUser(id, updatedData) {
    try {
      const changes = await new Promise((resolve, reject) => {
        database.run(
          "UPDATE users SET name = ?, age = ? WHERE id = ?",
          [updatedData.name, updatedData.age, id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.changes);
            }
          }
        );
      });
      if (changes === 0) {
        return null;
      }
      return await this.getUserById(id);
    } catch (err) {
      return "error";
    }
  },

  async deleteUser(id) {
    try {
      const changes = await new Promise((resolve, reject) => {
        database.run("DELETE FROM users WHERE id = ?", [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });
      return changes > 0;
    } catch (err) {
      return "error";
    }
  },

  async getUserById(id) {
    try {
      const user = await new Promise((resolve, reject) => {
        database.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
      return user;
    } catch (err) {
      return "error";
    }
  },
};
