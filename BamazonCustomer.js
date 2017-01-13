var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazon"
})

//
connection.connect(function(err) {
  if (err) throw err;
    console.log(" ");
	console.log ('IT IS TIME TO BAMAZON! Shop till you drop!');
	console.log ("ID" +" | "+ "Product Name"+ " | "+" Department Name" +" | "+"$$$"+"Price");
	console.log(" ");	
});

purchase();

function purchase(){
  connection.query('SELECT * FROM products', function(err,res){
  	console.log(" ");
  for(var i=0;i<res.length;i++){
  	
	console.log(res[i].id+" | "+res[i].productName+" | "+res[i].departmentName+" | "+"$"+res[i].price);
	} 

    console.log("--------------------------");

})

  inquirer.prompt([{
        type: 'input',
        message: 'Please enter the product ID to purchase:',
        name: 'id'
       },{
       	type:'input',
       	message: 'Please enter quantity:',
       	name: 'stock'
       }]).then(function (answers) {
        
        connection.query("SELECT * FROM products WHERE id = ?", answers.id, function(err,res){
          if(err) throw err;          
  
             // Stock Quantity Check
            if (answers.stock > res[0].stock){
            	console.log(" ");
            	console.log("Insufficient quantity!: There are only "+ res[0].stock+" items left in stock!" );
            
            purchase();
          } 

          // Total Cost calculate
          else{
            var total = answers.stock * res[0].price 

            console.log(" ");
            console.log("Purchase Summary: " +answers.stock + " " + res[0].productName + "." );

            console.log("Your total is " + " $" +total);
            console.log("Thank you for shopping!");            
          }      

        })

});
}
