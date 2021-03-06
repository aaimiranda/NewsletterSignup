const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

const data = {
    member: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    }]
};

const jsonData = JSON.stringify(data);

const url = "url server"

const options = {
    method: "POST",
    auth: "newsletter: API Key"
}

const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
        res.send("Successfully subscribed!");
    } else {
        res.send("There was an error eith signing up, please try again!");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

})

request.write(jsonData);
request.end();

});


app.listen(port, function() {
    console.log("Server is running at http://localhost:"+ port, );
})
