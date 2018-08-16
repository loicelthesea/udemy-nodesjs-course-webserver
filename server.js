const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('getTitle', () => 'Webserver');
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our website!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error: unable to process request',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
