const express = require('express'),
      fileUpload = require("express-fileupload"),
      bodyParser = require("body-parser"),
      mysql = require("mysql"),
      path = require("path"),
      app = express(),
      ejs = require("ejs"),
      port = 8081;

app.set("port",process.env.port || port);
console.log("main path= " + __dirname);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true})); // for url
app.use(bodyParser.json()); // parse data from client as json
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload()); // configure file upload

// configure routes for products app
const {mainPage} = require("./routes/index");
const {addProductPage,addProduct,editProductPage,editProduct,deleteProduct} = require("./routes/product");

app.get("/",mainPage);
app.get("/add",addProductPage);
app.post("/add",addProduct);
app.get("/edit/:id",editProductPage);
app.post("/edit/:id",editProduct);
app.get("/delete/:id",deleteProduct);

// create connection to mysql database
const db = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"products",
         });
db.connect((err)=>{
   if(err)
   throw err;
   console.log("Connection to Database Successed");
});
global.db = db;

app.listen(port,()=>{
   console.log("server runing on port: " + port);
});
