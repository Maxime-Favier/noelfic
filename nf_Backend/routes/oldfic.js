const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const cn = {
    user: 'maxime',
    host: 'localhost',
    database: 'maximedb',
    password: 'maxime',
    port: 5432,
};
const db = pgp(cn);


/*
    @ Route: /oldfic/search?sorting=*str*,page=*int*
    @ Description: info on the fic
 */
router.get("/search", (req, res) => {

    // test if page is a number
    if (isNaN(req.query.page)) {
        res.status(400).send({
            "error": 400,
            "info": "invalid argument page",
            "htmlcat": "https://http.cat/400.jpg"
        })
    }

    let searchByTitle = false;
    if (typeof req.query.q != 'undefined') {
        searchByTitle = true;
    }

    if (searchByTitle) {
        // request to the database
        db.any("SELECT * FROM fics WHERE position($2 in titre) > 0 " +
            "ORDER BY CASE WHEN $3 = 'date' THEN date END, CASE WHEN $3 = 'grade' THEN note END DESC " +
            "LIMIT 25 OFFSET $1",
            [req.query.page, req.query.q, req.query.sorting])
        // On success send data
            .then((data) => {
                res.status(200).json(data)
            })
            // If error return errot
            .catch((err) => {
                console.log(err);
                res.status(500).send({
                    "error": 500,
                    "info": "SQL error",
                    "htmlcat": "https://http.cat/500"
                })
            })
    } else {
        // request to the database
        db.any("SELECT * FROM fics " +
            "ORDER BY CASE WHEN $2 = 'date' THEN date END, CASE WHEN $2 = 'grade' THEN note END DESC " +
            "LIMIT 25 OFFSET $1",
            [req.query.page, req.query.sorting])
        // On success send data
            .then((data) => {
                res.status(200).json(data)
            })
            // If error return errot
            .catch((err) => {
                console.log(err);
                res.status(500).send({
                    "error": 500,
                    "info": "SQL error",
                    "htmlcat": "https://http.cat/500"
                })
            })
    }

});


/*
    @ Route: /oldfic/search/counter
    @ Description: return the current number of fics
 */
router.get("/search/counter", (req, res) => {
    // request the number of fic to the database
    db.any("SELECT COUNT(*) FROM fics")
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                "error": 500,
                "info": "unexpected error",
                "htmlcat": "https://http.cat/500"
            })
        })
});

/*
    @ Route: /oldfic/:ficid/:chapitre
    @ Description:  Return the content of the fic :id, :chapitre
 */
router.get('/:ficid/:chapitre', (req, res) => {
    // test if the parameters are valid
    if (isNaN(req.params.ficid) || isNaN(req.params.chapitre)) {
        res.status(400).send({
            "error": 400,
            "info": "invalid argument in the request",
            "htmlcat": "https://http.cat/400.jpg"
        });

    } else {
        // request the chapitre of the fic to the database
        db.any("SELECT * FROM chapitres WHERE oldid= $1 AND chapitre= $2", [req.params.ficid, req.params.chapitre])
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({
                    "error": 500,
                    "info": "SQL error",
                    "htmlcat": "https://http.cat/500"
                })
            })
    }
});

module.exports = router;