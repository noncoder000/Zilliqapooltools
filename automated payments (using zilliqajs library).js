let MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017';

const { Transaction } = require('@zilliqa-js/account');
const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const CP = require ('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://api.zilliqa.com');


const CHAIN_ID = 1;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

// Populate the wallet with an account
const privkey = 'YOUR PRIVATE KEY YOU ARE USING TO SEND FROM';



zilliqa.wallet.addByPrivateKey(
  privkey
);

const address = CP.getAddressFromPrivateKey(privkey);
console.log("Your account address is:");
console.log(`0x${address}`);


global.accountarray = [];
global.i=0;
global.address1 = "";
global.newpowbalance ="";
global.mySubString ="";
global.mySubString2 ="";
global.mySubString3 ="";
global.mySubString4 ="";
global.newbalance = [];
global.newpaid = 0;
global.newrew = 0;
global.newbonus = 0;
global.listofwallets = [];

global.balanceold = [];
global.balancenew = [];
global.checknewminers = 0;
global.firsttime = 1;
global.delta = [];
global.bonus = [];
global.priceperwork = 50;
global.bonusthreshold = 10;
global.payment = [];
global.payment1 = "";
global.paymentcut = "";
global.paymenttoproxy = "";
global.makepayment = 0;
global.paidworks = 0;

global.tobepaidaddress = [];
global.tobepaidamount = [];
global.tobepaidbonus = [];


global.toaddrstr = [];


global.moment = require('moment');
moment().format('yyyy-mm-dd:hh:mm:ss');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

 
async function getaccounts() {

         
     
    let client = await MongoClient.connect(connectionString,
        { useNewUrlParser: true });

    let db = client.db('zil_pool');
    try {
      
        
       const wallets = await db.collection("zil_miners").distinct("wallet_address",(function(err, wallets){
       
          var listofwallets = JSON.stringify(wallets);
        
         accountarray = listofwallets.split(",");
       
       
         console.log(`# of wallets ${accountarray.length}`); 
         console.log(`list of wallets after parse ${accountarray}`); 

for (i = 0; i < accountarray.length; i++){

         accountarray[i] = accountarray[i].replace('"', '');
         accountarray[i] = accountarray[i].replace('"', '');
         accountarray[i] = accountarray[i].replace('[', '');
         accountarray[i] = accountarray[i].replace(']', '');

         toaddrstr = accountarray;
}
          //  db.close();}
        }))

         
 
    


client.close();
return listofwallets


} catch(error) {
console.error(error);
}   

}
      
    async function payminers() {

         
     
        let client = await MongoClient.connect(connectionString,
            { useNewUrlParser: true });

        let db = client.db('zil_pool');
        try {
          
            
            address1 = accountarray[i];    
          
            const res = await db.collection("zil_miners").find({ wallet_address: address1 },{projection: { _id: 0, work_verified: 1}}).toArray();;

   
     newpowbalance = JSON.stringify(res);
      mySubString = newpowbalance.substring(
        newpowbalance.lastIndexOf(":") + 1, 
        newpowbalance.lastIndexOf("}")
      
    );


   


  client.close();
  return newbalance;


} catch(error) {
console.error(error);
}   

}


async function incrementminers(){

    try {

  
          AsyncFunction();
         
       
      
} catch(error) {
    console.error(error);
    }   
}

async function AsyncFunction() {
    try {

     
    for (i=0; i < accountarray.length; i++){
   
     await payminers();

     newbalance[i] = parseInt(mySubString);
     
     balanceold[i] = balancenew[i];
     balancenew[i] = newbalance[i];}
     
     
 
     
      
  
     
      
    }
    catch (rejectedValue) {
        console.log("error, why error");
       
    }
  }
  


 
  getaccounts();
  console.log(`waiting 10 minutes`); 

setInterval(async function() {


   

 for (i=0; i < accountarray.length; i++) {

  delta[i] = parseInt(balancenew[i])-parseInt(balanceold[i]);



  if (makepayment <  accountarray.length){

    //you can make manual payments if you miss a payment, runs once.

 //delta[0] = 1;
 //delta[1] = 1;
 //delta[2] = 1;
 //etc.
makepayment = makepayment + 1; }

if (delta[i]>= bonusthreshold) {
    bonus[i] = 1; }

  payment = delta.slice(0);
  payment1 = bonus.slice(0);

 
  
 console.log(`${i}-----------------------`);
 console.log( moment().format('dd:hh:mm:ss'));
 console.log(`pool account ${accountarray[i]}`);
 console.log(`payment account ${toaddrstr[i]}`);
 console.log(`balance new ${balancenew[i]}`); 
 console.log(`balance old ${balanceold[i]}`);
if (payment[i] != undefined ){
console.log(`payment = ${payment[i].toString()} zils`); 
}
if (bonus[i] != undefined ){
console.log(`bonus = ${bonus[i].toString()} zils`); }
console.log("---------------------------");
 

 console.log("");


  payment = delta.slice(0);
  payment1 = bonus.slice(0);


 if ((payment[i] > 0 && payment[i] < 1000))  {  // (i.e 1000) SET SOME UPPER VALUE TO NOT PAYOUT IF YOU MAKE A BIG MISTAKE :) 
   
  

    tobepaidaddress.push(toaddrstr[i]);

    if (payment1[i] != 1){
    tobepaidamount.push(payment[i]*priceperwork); }

    if (payment1[i] == 1){
        tobepaidamount.push((payment[i]+payment1[i])*priceperwork); }


    tobepaidbonus.push(payment1[i]*priceperwork); 
  console.log(`got into payment loop ok`);

 
        console.log(`making payment of ${(Math.round(payment[i]*priceperwork))} zil to ${toaddrstr[i]}`);
        console.log(`making bonus payment of ${(Math.round(payment1[i]*priceperwork))} zil to ${toaddrstr[i]}`);
    
 
 }}

 
incrementminers();


}, 300000);
        

async function updatepowpaid() {

             
  let client = await MongoClient.connect(connectionString,
      { useNewUrlParser: true });

  let db = client.db('zil_pool');
  try {

    console.log(`TBP ADDRESS: ${tobepaidaddress[0]}`);

    
    var powaddress = tobepaidaddress[0]; 

    console.log(`powaddress: ${powaddress}`);
    
    //get total paid share number previously


    const res = await db.collection("zil_miners").find({ wallet_address: powaddress},{projection: { _id: 0, total_paid: 1}}).toArray();;

    console.log(`res: ${res}`);
    newpaid = JSON.stringify(res);

    console.log(`newpaid: ${newpaid}`);
     mySubString2 = newpaid.substring(
       newpaid.lastIndexOf(":") + 1, 
       newpaid.lastIndexOf("}")

      
     
   );
   console.log(`ss2: ${mySubString2}`);

   //get total rewards ever paid
   const res2 = await db.collection("zil_miners").find({ wallet_address: powaddress},{projection: { _id: 0, rewards: 1}}).toArray();;

   console.log(`res2: ${res2}`);
   newrew = JSON.stringify(res2);

   console.log(`newrewards: ${newrew}`);
    mySubString3 = newrew.substring(
      newrew.lastIndexOf(":") + 1, 
      newrew.lastIndexOf("}")

      );

      console.log(`ss3: ${mySubString3}`);
      console.log(`newrewards2: ${newrew}`);

       //get bonus rewards paid
   const res7 = await db.collection("zil_miners").find({ wallet_address: powaddress},{projection: { _id: 0, bonus_paid: 1}}).toArray();;

   console.log(`res2: ${res7}`);
   newbonus = JSON.stringify(res7);

   console.log(`newbonus: ${newbonus}`);
    mySubString4 = newrew.substring(
      newbonus.lastIndexOf(":") + 1, 
      newbonus.lastIndexOf("}")

       
  );
  console.log(`ss4: ${mySubString4}`);
  console.log(`newbonus: ${newbonus}`);
//set total shares paid
var myquery = { wallet_address: powaddress };
var newvalues = { $set: {total_paid: parseInt(mySubString2)+(tobepaidamount[0]/priceperwork)} };
const res3 = await db.collection("zil_miners").updateOne(myquery, newvalues); 

console.log(`total paid: ${parseInt(mySubString2)+(tobepaidamount[0]/priceperwork)}`);
//set last paid
var myquery2 = { wallet_address: powaddress };
var newvalues2 = { $set: {last_paid: tobepaidamount[0]} };
const res4 = await db.collection("zil_miners").updateOne(myquery2, newvalues2); 

console.log(`last paid: ${tobepaidamount[0]}`);
//set all time rewards paid
var myquery3 = { wallet_address: powaddress };
var newvalues3 = { $set: {rewards: parseInt(mySubString3)+tobepaidamount[0]} };
const res5 = await db.collection("zil_miners").updateOne(myquery3, newvalues3); 

console.log(`rewards: ${parseInt(mySubString3)+tobepaidamount[0]}`);

//set bonus

if (tobepaidbonus[0] == priceperwork) {

var myquery4 = { wallet_address: powaddress };
var newvalues4 = { $set: {bonus_paid: parseInt(mySubString4)+tobepaidbonus[0]} };
const res6 = await db.collection("zil_miners").updateOne(myquery4, newvalues4); 

console.log(`bonus: ${parseInt(mySubString4)+tobepaidbonus[0]}`); }

firsttime = 0;
 


        client.close();
        return res;
      
      
      } catch(error) {
      console.error(error);
      }   
      
      }




async function testBlockchain() {

    

    // Get Balance
    const balance = await zilliqa.blockchain.getBalance(address);
    // Get Minimum Gas Price from blockchain
    const minGasPrice = await zilliqa.blockchain.getMinimumGasPrice();
    console.log(`Your account balance is:`);
    console.log(balance.result)
    console.log(`Current Minimum Gas Price: ${minGasPrice.result}`);
    const myGasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
    console.log(`My Gas Price ${myGasPrice.toString()}`)
    console.log('Sufficient Gas Price?');
    console.log(myGasPrice.gte(new BN(minGasPrice.result))); // Checks if your gas price is less than the minimum gas price

    console.log(`tbpaddr ${tobepaidaddress[0]}`);
    console.log(`tbpamnt ${tobepaidamount[0]}`);

if (tobepaidaddress[0] == "0xADDRESS IN YOUR MONGO DB"){

    tobepaidaddress[0] = "0xREAL ADDRESS YOU WANT TO PAY";
  

 }


    // Send a transaction to the network
    const tx = await zilliqa.blockchain.createTransaction(
      zilliqa.transactions.new({
        version: VERSION,
        toAddr: tobepaidaddress[0],
        amount: new BN(units.toQa((tobepaidamount[0]), units.Units.Zil)), // Sending an amount in Zil (1) and converting the amount to Qa
        gasPrice: myGasPrice, // Minimum gasPrice veries. Check the `GetMinimumGasPrice` on the blockchain
        gasLimit: Long.fromNumber(1)
      })
    );
    
    paidworks = tobepaidamount/priceperwork;
    await updatepowpaid();
    tobepaidaddress.shift();
    tobepaidamount.shift();
    console.log(`shifted paid address ${tobepaidaddress[0]} left to be paid`);
    console.log(`to be paid amount ${tobepaidamount[0]}`);
    console.log(`#left to be paid ${tobepaidamount.length}`);
    
     

  console.log(`The transaction status is:`);
  console.log(tx.receipt);

  
 
}

setInterval(async function() {
    if (tobepaidaddress.length != 0 ){

            console.log(`#left to be paid,sending to payments ${tobepaidamount.length}`);

            if (tobepaidamount.length == 1){

                checknewminers = 1; 
        
             }

       await testBlockchain();

    

    }

    

       if (tobepaidamount.length == 0 && firsttime != 1 && checknewminers == 1){
           console.log(`#checknewminers is ${checknewminers}`);

          
            console.log(`#------getting new accounts---------------------------------------`);
            for (k=0; k < accountarray.length; k++) {
            balanceold[k] = null;
            balancenew[k] = null;
            bonus[k] = null;
            }
            
            await getaccounts();
            checknewminers = 0;
           
       
       }
    
       
    }, 600000);
            