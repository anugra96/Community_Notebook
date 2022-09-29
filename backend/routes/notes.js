const router = require("express").Router();
const Note = require("../models/Note");




// create a Node
router.post("/", async (req, res) => {
    // make new Node from request body
    const newNote = new Note(req.body);
    // try catch method to save the entry and/or catch any errors
    try {
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
    } catch (err) {
        res.status(500).json(err);
    }
});


// get all Nodes in descending order by created datetime
router.get("/", async (req, res) => {
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router