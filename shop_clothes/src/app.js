const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const cookieParser = require("cookie-parser");
const app = express();



app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 5 * 60 * 1000
    }
}))


const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//HTTP logger
app.use(morgan('combined'));

app.use(methodOverride('_method'));

//Temple engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            dola: (c) => {
                var convert = c.toString();
                return convert.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            tt: (a, b) => a * b,

        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


module.exports = app;