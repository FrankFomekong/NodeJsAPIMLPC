const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const DataRouter=require('./datas/routes.config');

var corsOptions = {
    origin: "http://localhost:8081"
};
//app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(express.json());

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
DataRouter.routesConfig(app);
app.set('port',(process.env.PORT || config.port));

app.listen(app.get('port'), function () {
    console.log('app listening at port %s', app.get('port'));
});
