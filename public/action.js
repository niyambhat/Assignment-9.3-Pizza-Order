let cusDetail = document.querySelector('.customerDetails');
let datetime = document.querySelector('.dateTime');
let qan = document.querySelector('.qan');
let options = document.querySelector('.options');
let pizzaname = document.querySelector('.pizzaname');
let estimateDelivery = document.querySelector('.estimateDelivery');
let bill = document.querySelector('.bill');
let CheesePizza = 12.55;




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
           let delivery=5;
        qan.innerHTML = value.NumBoxes;
        options.innerHTML = value.PizzaOptions;
        pizzaname.innerHTML = value.PizaType;
        let x =[];
        console.log(typeof(value.discount))
        let y
        if(typeof(value.discount) === 'object'){
           y= 'Invalid';
         } 
         
       
        x.push(JSON.parse(value.PizzaOptions));
        console.log(x);
        let ul = document.createElement('ul');  
        ul.innerHTML = `
        <li>Customer Name: ${value.FirstName} ${value.LastName} </li>
        <li>Address: ${value.Address} </li>
        <li>Customer Mobile: ${value.Mobile}</li>
        <li>Contact Email: ${value.Email}</li>
       `
    
       cusDetail.appendChild(ul);
       let tr = document.createElement('tr'); 
       let extras = document.createElement('tr'); 
       let trdeli = document.createElement('tr');
       let trtotal = document.createElement('tr');
       tr.innerHTML = `<td>${value.PizaType} x ${value.NumBoxes}@$ ${value.Price} per Pizza</td><td>$ ${value.Price*value.NumBoxes} </td>`
       extras.innerHTML = `<td>Extras: ${value.PizzaOptions}</td><td>+$ ${x.length * 0.5}</td>`
       trdeli.innerHTML = `<td>Delivery</td><td>+$ ${delivery}</td>`
       trtotal.innerHTML = `<td>TOTAL with promo <strong>[${value.Promo}] ${y} Promo</strong>  Discount ${value.discount} times  </td><td>$ ${(delivery+value.Price*value.NumBoxes)+(value.discount * (delivery+value.Price*value.NumBoxes))+x.length * 0.5 }</td>`
       bill.appendChild(tr);
       bill.appendChild(extras);
       bill.appendChild(trdeli);
       bill.appendChild(trtotal);
      

       }
          
    })
    .then(rendered => {                 // When we get the rendered document
        cacheInDatabase(rendered);      // cache it in the local database.
    })
    .catch(error => console.log(error))   
}

