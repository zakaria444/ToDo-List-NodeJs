const fs = require("fs");
let ejs = require("ejs");
const http = require("http");
const hostname = "localhost";
const port = 3000;
const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");

  let path = "./";
  switch (req.url) {
    case "/":
      path += "index.ejs";
      index();


      break;
    case "/about":
      path += "about.ejs";
      remove();
      // req.redirect('/index.ejs');

      break;
    default:
      path += "404.ejs";

      break;
  }
  function index(){

  connection.query("SELECT * FROM user", (err, rows) => {
    var rows = JSON.stringify(rows);
    let htmlFile = fs.readFileSync(path, "utf-8");
    let html = ejs.render(htmlFile, { name: rows });
    res.end(html);
  });}

  function remove() {
    connection.query("SELECT * FROM user", (err, rows) => {
      var rows = JSON.stringify(rows);
      let htmlFile = fs.readFileSync(path, "utf-8");
      let html = ejs.render(htmlFile, { name: rows });
      res.end(html);
    });


  }

  // res.end(html);
});

// server
server.listen(port, hostname);
console.log("start");

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

//sqs
// app.get('',function(req,res){
// // connection.query('SELECT * FROM user', (err,rows) => {
// //   if(err) throw err;
// //   console.log('Data received from Db:');
// //   rows.forEach( (rows) => {
// //     console.log(`${rows.name} lives in ${rows.email}`);
// //   });
// // });
// res.send('Hello Sir')
// })
