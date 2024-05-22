const data = require("../../sqlData");

module.exports = async (req, res) => {
  const users = await data.getUsers();
  if (users) {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Could not retrieve users" }));
  }
};
