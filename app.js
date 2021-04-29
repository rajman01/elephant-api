var express = require("express");
var app = express();
var fs = require("fs");

app.get("/", function(req, res){
   
        return res.status(200).json({
            error: false,
            message: "server working fine"
        });
});

app.get("/elephants", function(req, res){
    fs.readFile(__dirname + "/" + "elephants.json", "utf8", function(err, data){
        const response = JSON.parse(data)
        console.log(typeof response)
        return res.status(200).json({
            error: false,
            message: "found elephants",
            data: response
        });
    })
});

app.get("/elephants/:specie", function(req, res){
    fs.readFile(__dirname + "/" + "elephants.json", "utf8", function(err, data){;
        const response = JSON.parse(data);
        const species = response.filter(obj => {
            if(obj.species){
                return obj.species === req.params.specie
            }
        })
        return res.status(200).json({
            error: false,
            message: "found elephants",
            data: species
        });
    })
});

app.get("/elephants/id/:id", function(req, res){
    fs.readFile(__dirname + "/" + "elephants.json", "utf8", function(err, data){;
        const response = JSON.parse(data);
        const elephant = response.find(obj => {
            return obj._id.toLowerCase() === req.params.id.toLowerCase()
        })

        if (!elephant){
            return res.status(404).json({
                error: true,
                message: "elephant not found"
            });
        }
        return res.status(200).json({
            error: false,
            message: "elephant found",
            data: elephant
        });
    })
});

var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API elephant app listening at http://%s:%s", host, port)
})
