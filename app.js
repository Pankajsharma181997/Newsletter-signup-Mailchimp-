const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000 ......");
})

app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post('/',function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.emailID;

  const data = {members :[
    {
      email_address :email,
      status : "subscribed",
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }
  ]
}

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0//lists/be78b66031";

  const options ={
    method : "POST",
    auth : "Pankaj:61aceebe3030b63a9d80957a7c5f91e0-us1"
  }

  const requ =https.request(url,options,function(response){
    response.on("data",function(data){
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    })
  })

  requ.write(jsonData);
  requ.end();

})

app.post("/failure.html",function(req,res){
  res.redirect("/");
})



// API key : 61aceebe3030b63a9d80957a7c5f91e0-us1
// list ID : be78b66031
