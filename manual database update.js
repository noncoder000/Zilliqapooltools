let MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017';


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

global.payment = [];
global.payment1 = "";
global.tobepaidaddress = [];
global.tobepaidamount = [];
global.toaddrstr = [];




updatepowpaid();
        

async function updatepowpaid() {

             
  let client = await MongoClient.connect(connectionString,
      { useNewUrlParser: true });

  let db = client.db('zil_pool');
  try {
    
   tobepaidaddress = "0xYOURADDRESSGOESHERE";
      
    const res = await db.collection("zil_miners").find({ wallet_address: tobepaidaddress},{projection: { _id: 0, total_paid: 1}}).toArray();;

    console.log(`res: ${res}`);
    newpaid = JSON.stringify(res);

    console.log(`newpaid: ${newpaid}`);
     mySubString2 = newpaid.substring(
       newpaid.lastIndexOf(":") + 1, 
       newpaid.lastIndexOf("}")

      
     
   );
   console.log(`ss2: ${mySubString2}`);

   const res2 = await db.collection("zil_miners").find({ wallet_address: tobepaidaddress},{projection: { _id: 0, rewards: 1}}).toArray();;

   console.log(`res2: ${res2}`);
   newrew = JSON.stringify(res2);

   console.log(`newrewards: ${newrew}`);
    mySubString3 = newrew.substring(
      newrew.lastIndexOf(":") + 1, 
      newrew.lastIndexOf("}")

    
    
  );
  console.log(`ss3: ${mySubString3}`);
  console.log(`newrewards2: ${newrew}`);

  const res7 = await db.collection("zil_miners").find({ wallet_address: tobepaidaddress},{projection: { _id: 0, bonus_paid: 1}}).toArray();;

  console.log(`res2: ${res7}`);
  newbonus = JSON.stringify(res7);

  console.log(`newbonus: ${newbonus}`);
   mySubString4 = newrew.substring(
     newbonus.lastIndexOf(":") + 1, 
     newbonus.lastIndexOf("}")

      
 );
 console.log(`ss4: ${mySubString4}`);
 console.log(`newbonus: ${newbonus}`);

var myquery = { wallet_address: tobepaidaddress };
var newvalues = { $set: {total_paid: 1} };
const res3 = await db.collection("zil_miners").updateOne(myquery, newvalues); 

console.log(`newpaid: ${myquery}`);

var myquery2 = { wallet_address: tobepaidaddress };
var newvalues2 = { $set: {last_paid: 1} };
const res4 = await db.collection("zil_miners").updateOne(myquery2, newvalues2); 

console.log(`newpaid: ${myquery2}`);

var myquery3 = { wallet_address: tobepaidaddress };
var newvalues3 = { $set: {rewards: 1} };
const res5 = await db.collection("zil_miners").updateOne(myquery3, newvalues3); 

console.log(`newpaid: ${myquery3}`);

var myquery4 = { wallet_address: tobepaidaddress };
var newvalues4 = { $set: {bonus_paid: 1} };
const res6 = await db.collection("zil_miners").updateOne(myquery4, newvalues4); 

console.log(`bonus: ${myquery4}`); 

 


        client.close();
        return res;
      
      
      } catch(error) {
      console.error(error);
      }   
      
      }


