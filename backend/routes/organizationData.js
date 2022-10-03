const express = require("express");
const router = express.Router();

//importing data model schemas
let { organizationData } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find( 
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
    ).sort({ 'updatedAt': -1 }).limit(10);
});

module.exports = router;