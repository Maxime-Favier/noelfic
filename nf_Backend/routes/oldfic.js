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


router.get('/search', (req, res) => {

    const serverError = {"error": 500, "info": "SQL error", "htmlcat": "https://http.cat/500"};
    const clientError = {"error": 400, "info": "invalid argument", "htmlcat": "https://http.cat/400.jpg"};
    const genreList = [{id: 1, label: "Action"}, {id: 2, label: "BD"}, {id: 3, label: "Concours"},
        {id: 4, label: "Fantastique"}, {id: 5, label: "Horreur"}, {id: 6, label: "Moins de 15 ans"},
        {id: 7, label: "Nawak"}, {id: 8, label: "No-Fake"}, {id: 9, label: "Polar"}, {id: 10, label: "Réaliste"},
        {id: 11, label: "Sayks"}, {id: 12, label: "Science-Fiction"}, {id: 13, label: "Sentimental"},];


    // Recherche by oldid
    if (typeof req.query.id === "string") {

        if (isNaN(req.query.id)) {
            res.status(400).send(clientError)
        } else {
            // research by id
            db.any("SELECT * FROM fics WHERE oldid=$1", req.query.id)
                .then(data => res.status(200).json(data))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(serverError)
                })
        }
    } else {
        // check sorting, page, genre parameter exist
        if (typeof req.query.sorting != "string" || isNaN(req.query.page) || JSON.parse(req.query.genre).constructor !== Array) {
            res.status(400).send(clientError);
        } else {

            // parse genre list
            let genres = [];
            JSON.parse(req.query.genre).forEach(item => {
                genres.push(genreList[item - 1].label)
            });

            // research with title
            if (typeof req.query.q != 'undefined') {
                db.any("SELECT * FROM fics WHERE position($1 IN titre) > 0 AND genre IN ($2:list) ORDER BY CASE WHEN $3 = 'date' THEN date END, CASE WHEN $3 = 'grade' THEN note END DESC LIMIT 25 OFFSET $4 * 25",
                    [req.query.q, genres, req.query.sorting, req.query.page])
                    .then(data => res.status(200).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(serverError)
                    })
            } else {
                db.any("SELECT * FROM fics WHERE genre IN ($1:list) ORDER BY CASE WHEN $2 = 'date' THEN date END, CASE WHEN $2 = 'grade' THEN note END DESC LIMIT 25 OFFSET $3 * 25",
                    [genres, req.query.sorting, req.query.page])
                    .then(data => res.status(200).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(serverError)
                    })
            }
        }
    }
});

/*
    @ Route: /oldfic/search/counter
    @ Description: return the current number of fics
 */
router.get("/search/counter", (req, res) => {
    // request the number of fic to the database

    const serverError = {"error": 500, "info": "SQL error", "htmlcat": "https://http.cat/500"};
    const clientError = {"error": 400, "info": "invalid argument", "htmlcat": "https://http.cat/400.jpg"};
    const genreList = [{id: 1, label: "Action"}, {id: 2, label: "BD"}, {id: 3, label: "Concours"},
        {id: 4, label: "Fantastique"}, {id: 5, label: "Horreur"}, {id: 6, label: "Moins de 15 ans"},
        {id: 7, label: "Nawak"}, {id: 8, label: "No-Fake"}, {id: 9, label: "Polar"}, {id: 10, label: "Réaliste"},
        {id: 11, label: "Sayks"}, {id: 12, label: "Science-Fiction"}, {id: 13, label: "Sentimental"},];

    if (typeof req.query.sorting != "string" || isNaN(req.query.page) || JSON.parse(req.query.genre).constructor !== Array) {
        res.status(400).send(clientError);
    } else {

        // parse genre list
        let genres = [];
        JSON.parse(req.query.genre).forEach(item => {
            genres.push(genreList[item - 1].label)
        });

        // research with title
        if (typeof req.query.q != 'undefined') {
            db.any("SELECT COUNT(*) FROM fics WHERE position($1 IN titre) > 0 AND genre IN ($2:list) ORDER BY CASE WHEN $3 = 'date' THEN date END, CASE WHEN $3 = 'grade' THEN note END DESC LIMIT 25 OFFSET $4 * 25",
                [req.query.q, genres, req.query.sorting, req.query.page])
                .then(data => res.status(200).json(data))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(serverError)
                })
        } else {
            db.any("SELECT COUNT(*) FROM fics WHERE genre IN ($1:list) ORDER BY CASE WHEN $2 = 'date' THEN date END, CASE WHEN $2 = 'grade' THEN note END DESC LIMIT 25 OFFSET $3 * 25",
                [genres, req.query.sorting, req.query.page])
                .then(data => res.status(200).json(data))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(serverError)
                })
        }
    }
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