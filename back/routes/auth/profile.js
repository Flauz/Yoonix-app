const express = require("express");
const router = express.Router();
const connection = require("../../helpers/db");

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