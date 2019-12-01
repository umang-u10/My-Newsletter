//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.mail;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  var JsonData = JSON.stringify(data);
  console.log("Firstname: "+fname+" Last name: "+lname+" Email: "+email);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/c6fc571b1f",
    method: "POST",
    headers:{
      "Authorization": "umang_u2 a16abcd109f6353f368d6a57a090da25-us4"
    },
    body: JsonData
  };

request(options,function(error,response,body){
  if(error){
    res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode == 200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
      res.sendFile(__dirname+"/failure.html");
    }}
});

//a16abcd109f6353f368d6a57a090da25-us4
//c6fc571b1f

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(3000,function(){
  console.log("Server started at port: 3000");
});
