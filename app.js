const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');
const bodyParser =	require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Require in Express Router
const routes = require('./routes');

app.set('view engine', 'nunj');

app.use(express.urlencoded({ extended: false }));


nunjucks.configure('./views', {
  autoescape: true,
  express: app
})

app.use('/', routes);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/media', express.static(path.join(__dirname, '/media')));

app.use(session({ 
  secret: 'secret', 
  saveUninitialized: false, 
  resave: false, 
  cookie: { maxAge: 1000 } 
}));



// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html', { error: err });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('api ready on port = ' + PORT);
})

module.exports = app;