const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  console.log(firstName);
  console.log(lastName);
  console.log(email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fileds : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/923befb90a";
  const options = {
    method : "post",
    auth : "tuxmandeep:a1ffb8205491a7bea1edbdb1f1ee396a8-us19"
  }
  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
      if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure", (req,res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started in port number 3000");
});

//1ffb8205491a7bea1edbdb1f1ee396a8-us19

//List
//923befb90a
