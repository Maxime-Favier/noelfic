const express = require('express');
//const Router = require('express-promise-router');
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


//const router = new Router();
/*
    @ ROUTE : /apiv1/
    @ DESC: Return the homepage
    @ TODO: create documentation for the api
*/
router.get('/', async (req, res, next) => {

    res.send('api home page');
});


/*
    @ ROUTE : /oldfic/date/:page
    @ DESC: Return fics infos from the database order by date
*/
router.get('/oldfic/date/:page', (req, res, next) => {

    if (isNaN(req.params.page)) {
        res.status(400).send({
            "error": 400,
            "info": "invalid argument page",
            "htmlcat": "https://http.cat/400.jpg"
        })
    } else {

        db.any("SELECT * FROM fics ORDER BY date DESC LIMIT 25 OFFSET $1", [req.params.page])
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

/*
    @ ROUTE : /oldfic/grade/:page
    @ DESC : Return fics infos from the database order by user reviews
 */
router.get('/oldfic/grade/:page', (req, res, next) => {

    if (isNaN(req.params.page)) {
        res.status(400).send({
            "error": 400,
            "info": "invalid argument page",
            "htmlcat": "https://http.cat/400.jpg"
        })
    } else {

        db.any("SELECT * FROM fics ORDER BY note DESC LIMIT 25 OFFSET $1", [req.params.page])
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


/*
    @ ROUTE : /apiv1/oldfic/counter
    @ DESC: Return the number of fics in the table fics
*/
router.get('/oldfic/counter', (req, res, next) => {

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
    @ ROUTE : /apiv1/oldfic/:ficid/:chapitre
    @ DESC : Return the content of the fic :id, :chapitre
 */
router.get('/oldfic/:ficid/:chapitre', (req, res, next) => {

    if (isNaN(req.params.ficid) || isNaN(req.params.chapitre)) {
        res.status(400).send({
            "error": 400,
            "info": "invalid argument in the request",
            "htmlcat": "https://http.cat/400.jpg"
        });

    } else {

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