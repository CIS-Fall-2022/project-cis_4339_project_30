const express = require("express");
const router = express.Router();
const organizationid = process.env.organization;

//importing data model schemas
let { organizationdata } = require("../models/models"); 

// dinamyc 
//POST add data to the database 
router.post("/", (req, res, next) => { 
    organizationdata.create(req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
                //res.send('event is added to the database')
            }
        }
    );
});

//GET all entries, just the name you need for the organization 
//change to id 
router.get("/name", (req, res, next) => {  //
    //console.log( req.params.id)
    organizationdata.find( {_id: organizationid}, 
        (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data)
            }
        }
    );
});


module.exports = router;