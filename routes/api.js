const express = require('express');
const Router = require('express-promise-router');
//const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
    user: 'maxime',
    host: 'localhost',
    database: 'maximedb',
    password: 'maxime',
    port: 5432,
});

const router = new Router();
/*
    @ ROUTE : /apiv1/
    @ DESC: Return the homepage
    @ TODO: create documentation for the api
*/
router.get('/', async (req, res, next) => {

    res.send('api home page');
});


/*
    @ ROUTE : /apiv1/classement/date/:page
    @ DESC: Return fics infos from the database order by date
    @ TODO : Verification de la page
*/
router.get('/classement/date/:page', async (req, res, next) => {

    let request = {
        text: "SELECT * FROM fics ORDER BY id LIMIT 25 OFFSET $1",
        values: [req.params.page * 25]
    };

    await pool.query(request, (err, response) => {
        if (err) throw err.stack;
        //console.log(response.rows);
        res.send(response.rows);
    })

});

/*
    @ ROUTE : /apiv1/classement/note/:page
    @ DESC : Return fics infos from the database order by user reviews
    @ TODO : Verifiaction de la page
 */
router.get('/classement/grade/:page', async (req, res, next) => {
    let request = {
        text: "SELECT * FROM fics ORDER BY datetime DESC LIMIT $1+25 OFFSET $1"
    }
});


/*
    @ ROUTE : /apiv1/counter
    @ DESC: Return the number of fics in the table fics
*/
router.get('/counter', async (req, res, next) => {

    const request = {
        text: "SELECT COUNT(*) FROM fics"
    };

    await pool.query(request, (err, response) => {
        if (err) throw err.stack;
        res.send(response.rows);
    })
});


module.exports = router;