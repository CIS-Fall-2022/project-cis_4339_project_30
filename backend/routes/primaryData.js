const express = require("express"); 
const router = express.Router(); 
const organizationid = process.env.organization; // this call the organization id using the database 

//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 
let { organizationdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find( {organizationDataSchema_id: organizationid},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID 
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } , organizationDataSchema_id: organizationid}
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//ERROR DONT WORRY
//GET events for a single client
//router.get("/events/:id", (req, res, next) => { 

//});

// DELETE
// ALSO DELETE THE ATEENDESS

router.put("/attendeeremove/:id", (req, res, next) => { 
    eventdata.findOneAndUpdate( 
        { _id: req.params.id,
        attendees: req.body.attendee_id },
        {$pull: {attendees: req.body.attendee_id}},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                //res.json('attendee removed');
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    req.body.organizationDataSchema_id = organizationid
    console.log(req.body)
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//Delete for Client Intake form
router.route("/remove/:id").delete(function(req, res) {
    primarydata.remove({ _id: req.params.id }, function(err, result) {
      if (err) {
        console.err(err);
      } else {
        res.json(result);
      }
    });
  });

//This is how an attendee gets deleted from an event 
router.put("/attendeeremove/:id", (req, res, next) => { 
    eventdata.findOneAndUpdate( 
        { _id: req.params.id,
        attendees: req.body.attendee_id },
        {$pull: {attendees: req.body.attendee_id}},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json('attendee removed');
            }
        }
    );
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

module.exports = router;