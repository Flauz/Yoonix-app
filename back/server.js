// je déclare l'ensemble des librairies nécessaires
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const connection = require('./helpers/db')
const routes = require('./routes/index')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy


// je configure l'application
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


// j'implémente la partie API



app.use('/auth', routes.auth);//où authRouter est issu de l'importation


app.get("/profile", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send(req.user);
})

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false
        },
        function (email, password, cb) {
            console.log("email:", email)
            connection.query(
                "SELECT * FROM users where email = ? ",
                [email],
                (err, res) => {
                    if (err) {
                        return cb(err);
                    } else if (res.length === 0) {
                        console.log(res);
                        return cb(null, false);
                    } else {
                        return cb(null, res, { info: password });
                    }
                }
            );
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "your_jwt_secret"
        },
        function (jwtPayload, cb) {
            return cb(null, jwtPayload);
        }
    )
);


/// dans le cas d'une route non trouvée, je retourne le code 404 'Not Found'
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});





//je lance le serveur node
let server = app.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port ' + server.address().port);
});