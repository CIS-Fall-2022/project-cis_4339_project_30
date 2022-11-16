const express = require("express");
const router = express.Router();
const organizationid = process.env.organization; // this call the organization id 
// organizatationid needs to be filter 

//importing data model schemas
let { eventdata } = require("../models/models"); 
let { organizationdata } = require("../models/models"); 

//for organizations we nned a post 
// add new routers
//GET all entries from eventdata in postman get eventdata works
router.get("/", (req, res, next) => { 
    eventdata.find({organizationDataSchema_id: organizationid}, // this will filter the id from organization
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});// do i need a res.send or res.redirect?

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query/
// ASK 
//Ex: 'QUERY...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } , organizationDataSchema_id: organizationid}
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"], organizationDataSchema_id: organizationid
             // adding variables because when serching for the event make sure its in the select organization
        }
    };
    eventdata.find( 
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

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST assign 
router.post("/", (req, res, next) => { 
    req.body.organizationDataSchema_id = organizationid // this add the event id to the body
    eventdata.create(req.body, 
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

//Delete for event data
router.route("/remove").delete(function(req, res) {
    eventdata.remove({ _id: req.body._id }, function(err, result) {
      if (err) {
        console.err(err);
      } else {
        res.json(result);
      }
    });
  });

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
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
// DELETE ALSO INCLUDES THE ATTENDEES
//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

module.exports = router;