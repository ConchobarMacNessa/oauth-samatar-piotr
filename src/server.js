const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const server = new hapi.Server();
const routes = require('./routes');


server.connection({
  port: process.env.PORT || 3000,
  tls: {
        key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
    }
});


server.register([inert], (err)=>{
  if (err) throw err;

  server.state('samatar_piotr_cookie', {
    ttl: 1000*60*60*24,
    encoding: 'base64json',
    path: '/'
  });

  server.route(routes);

});

module.exports = server;
