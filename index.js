const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const url = require("url");
const user = require("./user");
const mysql = require("mysql");
const {
  CLIENT_IGNORE_SIGPIPE,
} = require("mysql/lib/protocol/constants/client");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
console.log(user);
http
  .createServer(function (req, res) {
    let urls = req.url;

    if (req.url === "/insertion" && req.method === "GET") {
      var datas = "";
      fs.readFile("./index.ejs", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(data);

        res.end();
      });
    } else if (req.url === "/insertion" && req.method === "POST") {
      console.log(req.method);

      req
        .on("data", (data) => (datas += data))
        .on("end", () => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          console.log(datas);
          let ddd = qs.parse(datas);
          res.write(
            ` sender : ${ddd.undefinedtodo} email : ${ddd.email} message : ${ddd.message} `
          );
          let q = `INSERT INTO user( name, email, password_s) VALUES ('${ddd.undefinedtodo}','${ddd.email}','${ddd.message}')`;
          connection.query(q,
            (err, result) => {
              console.log("insert : ", q);

              res.end();
            }
          );
        });
    }
  })
  .listen(3000);
console.log("server run");
