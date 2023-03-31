const express=require("express");
const bodyparser=require("body-Parser");
const http=require("https");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.post("/formdetails",function(req,res){
  const firstname=req.body.first;
  const lastname=req.body.last;
  const email=req.body.email;
  const data={

    members:[
      {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME: firstname,
            LNAME: lastname
          }
      }
    ]
  };

const url="https://us21.api.mailchimp.com/3.0/lists/6c6974e074";



  const jsonData=JSON.stringify(data);

  const options = {
    method:"POST",
    auth:"Ratish1:f4bd70a5f2054d0a0dbe0f3cf33c8685-us21"
  }


  const request=http.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
      if(JSON.parse(data).error_count===0)
      {
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    });
  });



  request.write(jsonData);
  request.end();
});



app.listen(3000,function(){
  console.log("Server running at port 3000");
})



//API KEY
//f4bd70a5f2054d0a0dbe0f3cf33c8685-us21


//List // IDEA:
//6c6974e074
