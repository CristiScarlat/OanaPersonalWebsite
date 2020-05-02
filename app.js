var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');

var app = express();

// Require in Express Router
const router = require('./routes');

app.set('view engine', 'nunj'); 

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure('./views', {
  autoescape: true,
  express: app
})


// app.get('/', function(req, res){
//   res.render('index.html', {port: 5000, page: 'Home'});
// });
// index page
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html', {error: err});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('api ready on port = ' + PORT);
})

module.exports = app;