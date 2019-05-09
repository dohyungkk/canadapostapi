var express = require('express');
var router = express.Router();

const axios = require('axios');
const fs = require('fs');
const parseString = require('xml2js').parseString;
let xpath = require("xml2js-xpath");

// PIN Details URI
let url = "https://ct.soa-gw.canadapost.ca/vis/track/pin/1681334332936901/summary";
let cpo = "http://www.canadapost.ca/ws/track";

let trackingSummary = axios.get(url, { 
    headers: { 
        Authorization: 'Basic ' + Buffer.from('f8d841b5752e75c6:cb4a6c1982e4b488e04696').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/vnd.cpc.track+xml'
    }
}).then((response) => {    
        //let select = xpath.useNamespaces({"ns0": "http://www.canadapost.ca/ws/track"});

    let xml_string = fs.readFileSync("summary", "utf8");

    parseString(xml_string, function (err, result) {
        if (!xml_string) {
            console.log("error");
        } else {
            let pinNumber = xpath.find(result, "//pin");
            let mailedOnDate = xpath.find(result, "//mailed-on-date");
            let eventDescription = xpath.find(result, "//event-description");
            console.log("PIN Number: " + pinNumber);
            console.log("Mailed On Date: " + mailedOnDate);
            console.log("Event Description: " + eventDescription);
            console.log();
            console.log(response.data + "\n");

            router.get('/', function (req, res) {
				res.send("PIN Number: " + pinNumber + '</br>' + '</br>'
					+ "Mailed On Date: " + mailedOnDate + '</br>' + '</br>'
					+ "Event Description: " + eventDescription);
			})
        }
    });
}).catch(function (error) {
// handle error
  	console.log(error);
}).then(function () {
// always executed
});

// router.get('/', function (req,res) {
// 	res.send("hi");
// })

module.exports=router;
