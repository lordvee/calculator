const fastify = require('fastify');
const fs = require('fs');
const path = require('path');


const app = fastify();



app.register(require('fastify-static'), {
  root: path.join(__dirname, '../client'),
  prefix: '/', // optional: default '/'
});
app.register(require('fastify-cors'), {
  // put your options here
})

require('./api/calculate').calculator(app);

app.listen(3000).then(() => {

});

exports = module.exports = app;
