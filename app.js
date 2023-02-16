//BEGIN:
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const os = require('os');
var ip = require("ip");
const cafeshop = express();
const tea = express();
const coffee = express();
var Server_Hostname = os.hostname();
var Server_Address = ip.address();

//LISTENERS
cafeshop.listen(80);
tea.listen(8081);
coffee.listen(8082);

//EXPRESS 
cafeshop.use(express.static('public'));
cafeshop.use((req, res, next) => {
    console.log('Req executed from Source IP', req.ip);
    next();
})

tea.use(express.static('public'));
tea.use((req, res, next) => {
    console.log('Req executed from Source IP', req.ip);
    next();
})

coffee.use(express.static('public'));
coffee.use((req, res, next) => {
    console.log('Req executed from Source IP', req.ip);
    next();
})


//FOR CAFESHOP ON PORT 80
cafeshop.set('json spaces', 2);
cafeshop.get('/',(req, res) => {
    res.json({'INFO':'----------------------',
	      'Service_Name': 'CAFESHOP',
	      'POD_Name:': Server_Hostname,
              'Request_Source' : req.ip,
              'Response_Source': Server_Address,
    })
});
cafeshop.get('/healthz', (req, res) => {
    res.json({'health': 'OK',})
});
cafeshop.get('/badurl', (req, res) => {
    res.json({'Bad' : 'URL',})
});
cafeshop.get('/righturl', (req, res) => {
    res.json({'Redirected': 'right URL',})
});

//FOR TEA on 8081
tea.set('json spaces', 2);
tea.get('/', (req, res) => {
	res.json({'INFO':'$$$$$$$$$$$$$$$$$$$$',
              'Service_Name': 'TEA-SERVICE',
              'POD_Name:': Server_Hostname,
              'Request_Source' : req.ip,
              'Response_Source': Server_Address})
});
tea.get('/api/v1/tea', (req, res) => {
    res.json({'Service': 'TEAA_SERVICE-V1'})
});
tea.get('/api/v2/tea', (req, res) => {
    res.json({'Service': 'TEA-SERVICE-V2'})
});

//FOR COFFEE on 8082
coffee.set('json spaces', 2);
coffee.get('/', (req, res) => {
	res.json({'INFO':'*********************',
              'Service_Name': 'COFFEE-SERVICE',
              'POD_Name:': Server_Hostname,
              'Request_Source' : req.ip,
              'Response_Source': Server_Address})
});
coffee.get('/api/v1/coffee', (req, res) => {
    res.json({'Service': 'COFEEE_SERVICE-V1'})
});
coffee.get('/api/v2/coffee', (req, res) => {
    res.json({'Service': 'COFFEE-SERVICE-V2'})
});

//END
