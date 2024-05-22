const data = require("../../sqlData");

module.exports = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const success = await data.deleteUser(id);

  if (success === "error") {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Could not delete user" }));
  } else {
    if (success) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
    }
  }
};
