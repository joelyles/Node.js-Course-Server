const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
data.employees = require('../../data/employees.json');

// router.get();
// router.put(); etc

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lasttname": req.body.lastname,
        });
    })
    .put((req, res) => {
         res.json({
            "firstname": req.body.firstname,
            "lasttname": req.body.lastname,
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

modeule.exports = router;