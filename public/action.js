let cusDetail = document.querySelector('.customerDetails');
let datetime = document.querySelector('.dateTime');
let qan = document.querySelector('.qan');
let options = document.querySelector('.options');
let pizzaname = document.querySelector('.pizzaname');
let estimateDelivery = document.querySelector('.estimateDelivery');



init();
function init(){
    document.addEventListener('DOMContentLoaded', getPosts);
}

function getPosts(){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
let estimate = today.getHours() + 1+ ":" + today.getMinutes() + ":" + today.getSeconds();
estimateDelivery.innerHTML=estimate;
datetime.innerHTML = dateTime;

    fetch('/order')                      // Make an HTTP request
    .then(response => response.json())  // Ask for the JSON body of the response
    .then(result => { 
     
       result.forEach(myFunction);
       function myFunction(value){
        qan.innerHTML = value.NumBoxes;
        options.innerHTML = value.PizzaOptions;
        pizzaname.innerHTML = value.PizaType;
        console.log(value);
        let ul = document.createElement('ul');  
        ul.innerHTML = `
        <li>Customer Name: ${value.FirstName} ${value.LastName} </li>
        <li>Address: ${value.Address} </li>
        <li>Customer Mobile: ${value.Mobile}</li>
        <li>Contact Email: ${value.Email}</li>
       `
       cusDetail.appendChild(ul);
       }
          
    })
    .then(rendered => {                 // When we get the rendered document
        cacheInDatabase(rendered);      // cache it in the local database.
    })
    .catch(error => console.log(error))   
}

