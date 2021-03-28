require("dotenv").config();

const schedule = require('node-schedule');
const https = require('https');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const router = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// MongoDB 데이터베이스 접속하기
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        poolSize: 10,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    })
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch(e => {
        console.error("Connection error: ", e);
    });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true
//     })
// );
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// //////////// router 설정 //////////////////////
app.use(router);
// //////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// heroku port 설정
const port = process.env.PORT || 3000;

/**
 * Heroku sleep 방지용
 */
schedule.scheduleJob('*/10 * * * *', () => {
    https.get('https://moca-music.herokuapp.com/');

    console.log('Heroku sleep 방지용 신호를 보냈습니다.');
});

app.listen(port, () => {
    console.log("Music Sheet app listening on port 3000!");
});
