const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var router = express.Router();

const axios = require('axios');
const fs = require('fs');
const parseString = require('xml2js').parseString;
const utf8 = require('utf8');
let xpath = require("xml2js-xpath");
let Readable = require('stream').Readable;
let Writable = require('stream').Writable;
//const readChunk = require('read-chunk');


function trackingDetail() {
    // PIN Details URI
    let url = "https://ct.soa-gw.canadapost.ca/vis/track/pin/1371134583769923/detail";
    
    axios.get(url, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('f8d841b5752e75c6:cb4a6c1982e4b488e04696').toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/vnd.cpc.track+xml'
        }
    }).then((response) => {  
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                let pinNumber = xpath.find(result, "//pin");
                let signatureExists = xpath.find(result, "//signature-image-exists");
                let suppressSignature = xpath.find(result, "//suppress-signature");
        
                app.get('/api/getDetail', (req,res) => {
                    var detail = ["PIN Number: " + pinNumber, "Signature Exists: " + signatureExists, "Suppress Signature: " + suppressSignature];
                    res.json(detail);
                    console.log('Sent list of detail');
                });
            }
        });  
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

}

// PIN Details URI
function trackingSummary() {
    // PIN Details URI
    let url = "https://ct.soa-gw.canadapost.ca/vis/track/pin/1681334332936901/summary";
    
    axios.get(url, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('f8d841b5752e75c6:cb4a6c1982e4b488e04696').toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/vnd.cpc.track+xml'
        }
    }).then((response) => {  
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                let pinNumber = xpath.find(result, "//pin");
                let mailedOnDate = xpath.find(result, "//mailed-on-date");
                let eventDescription = xpath.find(result, "//event-description");
        
                app.get('/api/getSummary', (req,res) => {
                    var summary = ["PIN Number: " + pinNumber, "Mailed On Date: " + mailedOnDate, "Event Description: " + eventDescription];
                    res.json(summary);
                    console.log('Sent list of summary');
                });
            }
        });  
    })
    .catch(function (error) {
            // handle error
        console.log(error);
    })
    .then(function () {
            // always executed
    });
    
}

//////////////////////////////////////////////////////////////////////////////////

function getDeliveryConfirmationCertificate() {
    let url = "https://ct.soa-gw.canadapost.ca/vis/certificate/1371134583769923"; // REST URL

    axios.get(url, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('f8d841b5752e75c6:cb4a6c1982e4b488e04696').toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/vnd.cpc.track+xml'
        }
    }).then((response) => {    
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                // retreive values from file
                let encodedImage = xpath.find(result, "//image");
                let fileName = xpath.find(result, "//filename");
                let mimeType = xpath.find(result, "//mime-type");
    
                // console.log("Base64 Encoded: " + encodedImage);
                // console.log("File name: " + fileName);
                // console.log("Mime type: " + mimeType);
                app.get('/api/getConfirm', (req,res) => {
                    var confirm = ["Base64 Encoded: " + encodedImage, "File name: " + fileName, "Mime type: " + mimeType];
                    res.json(confirm);
                    console.log('Sent list of confirmation');
                });
                const decodedImage = Buffer.from("" + encodedImage, 'base64'); 
                // console.log(decodedImage);
    
                let fileStream = new Readable();
                fileStream.push(decodedImage);
                fileStream.push(null);
                fileStream.pipe(fs.createWriteStream("1371134583769923.pdf"));
                console.log(fileStream);
                console.log("Decoding to " + __dirname + "\\" + fileName);
            }
        });
    })
    .catch(function (error) {
            // handle error
            console.log(error);
    })
    .then(function () {
            // always executed
    });
}

//////////////////////////////////////////////////////////////////////////////////
// shipment ID, details, group, price
function createShipment() {
    let mailedBy = "2004381";
    let mobo = "2004381";

    let url = "https://ct.soa-gw.canadapost.ca/rs/" + mailedBy + "/" + mobo + "/shipment"; // REST URL

    let xmlRequest = fs.readFileSync("shipment.xml", "utf8");
    let buffer = utf8.encode(xmlRequest.toString());
    
    //console.log(Buffer.byteLength(buffer));
    
    axios.post(url, buffer, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('6e93d53968881714:0bfa9fcb9853d1f51ee57a').toString('base64'),
            Accept: 'application/vnd.cpc.shipment-v8+xml',
            'Content-Type': 'application/vnd.cpc.shipment-v8+xml',
            'Content-Length': Buffer.byteLength(buffer)
        }
    }).then((response) => {
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                let shipmentID = xpath.find(result, "//shipment-id");
                console.log("Shipment ID: " + shipmentID);
            }
        });
        //console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

//////////////////////////////////////////////////////////////////////////////////

function getArtifact() {
    let username = "6e93d53968881714";
    let fileName = "shipmentArtifact.pdf";

    
    axios({ 
        method: 'GET', 
        url: "https://ct.soa-gw.canadapost.ca/rs/artifact/" + username + "/10001423504/0", 
        responseType: 'stream',
        headers: { 
            Authorization: 'Basic ' + Buffer.from('6e93d53968881714:0bfa9fcb9853d1f51ee57a').toString('base64'),
            'Content-Type': 'application/pdf',
            Accept: 'application/pdf'
        } 
    }) 
    .then(function (response) { 
        response.data.pipe(fs.createWriteStream(fileName));
        console.log("Writing response to " + __dirname + "\\" + fileName);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////////

function transmitShipments() {

    /* hardcoded data */
    let mailedBy = "2004381";
    let mobo = "2004381";

    let url = "https://ct.soa-gw.canadapost.ca/rs/" + mailedBy + "/" + mobo + "/shipment"; // REST URL

    let xmlRequest = fs.readFileSync("shipment.xml", "utf8");
    let buffer = utf8.encode(xmlRequest.toString());
    
    //console.log(Buffer.byteLength(buffer));
    
    axios.post(url, buffer, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('6e93d53968881714:0bfa9fcb9853d1f51ee57a').toString('base64'),
            Accept: 'application/vnd.cpc.shipment-v8+xml',
            'Content-Type': 'application/vnd.cpc.shipment-v8+xml',
            'Content-Length': Buffer.byteLength(buffer)
        }
    }).then((response) => {
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                let shipmentID = xpath.find(result, "//shipment-id");
                console.log("Shipment ID: " + shipmentID);
            }
        });
        //console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

//////////////////////////////////////////////////////////////////////////////////

function getManifest() {
    let username = "6e93d53968881714";
    let fileName = "manifestArtifact.pdf"

    let url = "https://ct.soa-gw.canadapost.ca/ers/artifact/" + username + "/10001419283/0"; // REST URL

    axios({ 
        method: 'GET', 
        url: "https://ct.soa-gw.canadapost.ca/rs/artifact/" + username + "/10001419283/0", 
        responseType: 'stream',
        headers: { 
            Authorization: 'Basic ' + Buffer.from('6e93d53968881714:0bfa9fcb9853d1f51ee57a').toString('base64'),
            'Content-Type': 'application/pdf',
            Accept: 'application/pdf'
        } 
    }) 
    .then(function (response) { 
        console.log(response.data);
        response.data.pipe(fs.createWriteStream(fileName));
        console.log("Writing response to " + __dirname + "\\" + fileName);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////////

function getShipments() {
    let mailedBy = "2004381";
    let mobo = "2004381";

    let url = "https://ct.soa-gw.canadapost.ca/rs/" + mailedBy + "/" + mobo + "/shipment?groupId=123456"; // REST URL

    axios.get(url, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('6e93d53968881714:0bfa9fcb9853d1f51ee57a').toString('base64'),
            Accept: 'application/vnd.cpc.shipment-v8+xml',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                let links = xpath.find(result, "//@href");
                console.log("shipment: " + JSON.stringify(links));
            }
        });
    })
    .catch(function (error) {
       // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

//////////////////////////////////////////////////////////////////////////////////

function getRates() {
    let url = "https://ct.soa-gw.canadapost.ca/rs/ship/price";
    let xmlRequest = fs.readFileSync("rating.xml", "utf8");
    let buffer = utf8.encode(xmlRequest.toString());

    axios.post(url, buffer, { 
        headers: { 
            Authorization: 'Basic ' + Buffer.from('f8d841b5752e75c6:cb4a6c1982e4b488e04696').toString('base64'),
            'Content-Type': 'application/vnd.cpc.ship.rate-v4+xml',
            Accept: 'application/vnd.cpc.ship.rate-v4+xml',
            'Content-Length': Buffer.byteLength(buffer)
        }
    }).then((response) => {        
        parseString(response.data, function (err, result) {
            if (!response.data) {
                throw err;
            } else {
                console.log(response.data);
            }
        });
    })
    .catch(function (error) {
        // handle error
            console.log(error);
    })
    .then(function () {
        // always executed
    });
}

//getShipments();
//createShipment();
// getArtifact();
getDeliveryConfirmationCertificate();
trackingSummary();
trackingDetail();
// getRates();
// getManifest();

// module.exports=router;

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

//////////////////////////////////////////////////

// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// // An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

// // Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'../../reactJS/public/index.html'));
// });

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log('App is listening on port ' + port);

///////////////////////////////////////////

// var express = require('express');
// var app = express();
// var routes = require('./routes/index');
// app.use('/', routes);
// app.use('/js',express.static('js'));
// app.set('port', process.env.PORT || 5000);
// var server = app.listen(app.get('port'), function() {
//     console.log("app started at 5000");
// })

///////////////////////////////////////////////

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
