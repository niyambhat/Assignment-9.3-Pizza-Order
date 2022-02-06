var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'bqdezanealesi0tixccf-mysql.services.clever-cloud.com',
  user: 'uxftub07nk9i5pnq',
  password: '5VHvVTgHD0Gi9oOVbj1X',
  database: 'bqdezanealesi0tixccf'
})

connection.connect(function(err){
    if (err) throw err;
  console.log("Connected!");
})

module.exports = connection;



