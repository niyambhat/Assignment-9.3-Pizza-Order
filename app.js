const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const app = express()
const db = require('./util/database')
const port = 3000
app.set('view engine', 'hbs')
app.set('views', './views');
app.use(express.static(path.join(__dirname,'/public')))


app.use(bodyParser.urlencoded({ extended: false }))

app.get('',(req,res)=>{
    res.render('index');
})

app.get('/feedback', (req,res)=>{
    res.render('feedback')
})

app.post('/order',(req,res)=>{
    
    let fname = req.body.firstname;
    let surname = req.body.surname;
    let address = req.body.address;
    let city= req.body.city;
    let state = req.body.state;
    let postcode = req.body.postcode;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let pizzaType = req.body.pizzaType;
    let numBoxes = req.body.numBoxes;
    let pizzaSize = req.body.pizzaSize;

    let pizzaOptions = req.body.pizzaOptions;
    console.log(fname, surname, address, city, state,postcode, email, mobile,pizzaType, numBoxes,pizzaSize, pizzaOptions )
    db.query(`
    UPDATE Persons set
    FirstName = '${fname}',
    LastName ='${surname}' ,
    Address = '${address}',
    City='${city}',
    State = '${state}' ,
    Email = '${email}',
    Mobile = '${mobile}',
    Postcode = '${postcode}',
    PizaType = '${pizzaType}',
    NumBoxes= '${numBoxes}',
    PizzaSize = '${pizzaSize}',
    PizzaOptions = '${pizzaOptions}'
    `)
    res.render('feedback');
})
   
app.get('/order', (req,res)=>{
    db.query(`Select * from Persons`, function(err, result, fields){
    if (err) throw err;
    res.send(result);
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// db.query(`
// CREATE TABLE Persons (
//     id int NOT NULL AUTO_INCREMENT,
    // FirstName varchar(255),
    // LastName varchar(255),
    // Address varchar(255),
    // City varchar(255),
    // State varchar(255),
    // Postcode varchar(255),
    // Email varchar(255),
    // Mobile varchar(255),
    // PizaType varchar(255),
    // NumBoxes varchar(255),
    // PizzaSize varchar(255),
    // PizzaOptions varchar(255),
    // PRIMARY KEY (id)
// );
// `)