const express = require("express");
const router = express.Router();

//importing data model schemas
let { organizationdata } = require("../models/models"); 


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
router.get("/:name", (req, res, next) => { 
    console.log( req.params.name)
    organizationdata.findOne( {name: req.params.name},
        (error, data) => {
            if (error) {
                return next(error);
            } else if (data ===null ) { 
                res.status(404).send('Organization not found');
            }
            else {
                res.json(data)
            }
        }
    );
});

module.exports = router;