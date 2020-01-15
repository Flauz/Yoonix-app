const app = require("express");
const express = require('express')
const router = express.Router();
const connection = require('../../helpers/db')
const bcrypt = require('bcrypt')
const passport = require("passport");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

router.use(bodyParser.json())



router.get("/", (req, res) => {
    res.send("youhou");
})

router.get("/signup", (req, res) => {
    connection.query('SELECT * from users', (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération du user`)
        } else {
            res.json(results);
        }
    })
})

router.post('/signup', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    console.log(user)
    connection.query(`INSERT INTO users SET ?`, [user], (err) => {
        if (err) {
            res.json({ flash: `Erreur lors de l'ajout du user` }).status(500)
        } else {
            res.json({ flash: "User has been signed up !" }).status(200)
        }
    })
})

router.post('/signin', (req, res) => {
    passport.authenticate('local', (err, user, info, hash) => {
        console.log(user)
        const token = jwt.sign(Object.assign({}, user), 'your_jwt_secret');
        if (err) return res.status(500).json({ flash: 'Error signing in'});
        if (!user) return res.status(400).json({ flash: 'Incorect email or password', error: true });
        else {
            console.log('mdp', info.info + ' ' + user[0].password)
            hashCompare = bcrypt.compareSync(info.info, user[0].password);
            console.log(hashCompare)
            if (hashCompare === false) {
                console.log('hashcompare');

                return res.json({ flash: 'Incorect email or password', error: true }).status(400);
            }
            else return res.json({ user, token, flash: user[0].name + ' ' + user[0].lastname + ' signed bonjour in !', error: false });
        }
    })(req, res)
});

router.route("/")
    .get((req, res) => {
        connection.query(
            "SELECT * FROM users Where email = ?",
            [req.body.email],
            (err, results) => {
                if (err) {
                    res.json({ flash: err.message, error: true }).status(500);
                } else {
                    res.json({ profile: { email: user[0].email, name: user[0].name, lastname: user[0].lastname } }).status(200);
                }
            }
        );
    });



module.exports = router;