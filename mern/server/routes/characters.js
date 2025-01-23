import express from "express";

//Connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

const router = express.Router();

//Add a new character
router.post("/", async (req, res) => {
    try {
        const collection = await db.collection("characters");
        const result = await collection.insertOne(req.body); //This is assuming req.body contains a 'name'
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding character");
    }
});

// This section will help you get a list of all the characters.
router.get("/", async (req, res) => {
    let collection = await db.collection("characters");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });
  
// This section will help you get a single record by id OR select records based on a query (where clause)
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("characters");

    if (Object.keys(req.query).length === 0) {
      // No query parameters, get record by id
      let query = { _id: new ObjectId(req.params.id) };
      let result = await collection.findOne(query);
      res.status(200).send(result);
    }
    //   if (!result) res.status(404).send("Not found");
    //   else res.status(200).send(result);
    // } 
    else {
      // Extract key and value from query parameters
      let key = Object.keys(req.query)[0];
      let value = req.query[key];
      let query = { campaignID: req.params.id, [key]: value }; // campaign id a foreign key string here, doesn't need to be cast to objectid

      let result = await collection.find(query).toArray();
      console.log(result);
      res.status(200).send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {

    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: req.body,
      };

      let collection = await db.collection("characters");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  });
  
  // This section will help you delete a record
router.delete("/:id", async (req, res) => {

  try {
      const query = { _id: new ObjectId(req.params.id) };
      const collection = db.collection("characters");
      let result = await collection.deleteOne(query);

      res.send(result).status(200);
      } catch (err) {

      console.error(err);
      res.status(500).send("Error deleting record");
  }
});

export default router;