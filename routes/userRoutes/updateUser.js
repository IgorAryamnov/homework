const data = require("../../sqlData");

module.exports = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const parsedBody = new URLSearchParams(body);
    const updatedData = {};
    parsedBody.forEach((value, key) => {
      updatedData[key] = key === "age" ? parseInt(value) : value;
    });

    const updatedUser = await data.updateUser(id, updatedData);

    if (updatedUser === "error") {
      res.writeHead(500);
      res.end(JSON.stringify({ message: "Could not update user" }));
    } else {
      if (updatedUser) {
        res.writeHead(200);
        res.end(JSON.stringify(updatedUser));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "User not found" }));
      }
    }
  });
};
