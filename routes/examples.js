const ObjectId = require("mongodb").ObjectID;
const express = require("express");
const router = express.Router();

router.get("/examples", async (req, res) => {
  try {
    const db = req.db;
    const examples = await db
      .collection("examples")
      .find()
      .toArray();
    res.json(examples);
  } catch (e) {
    console.log(e);
  }
});

router.get("/examples/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const db = req.db;
    const example = await db
      .collection("examples")
      .findOne({ _id: ObjectId(req.params.id) });
    console.log(example);
    res.json(example);
  } catch (e) {
    console.log(e);
  }
});

router.post("/examples", async (req, res) => {
  try {
    const db = req.db;
    db.collection("examples")
      .insertOne({ ...req.body })
      .then(response => {
        res.statusCode = 201;
        res.json(response.ops[0]);
      });
  } catch (e) {
    console.log(e);
  }
});

router.put("/examples/:id", async (req, res) => {
  console.log(req.body)
  try {
    const db = req.db;
    db.collection("examples")
      .updateOne(
        { _id: ObjectId(req.params.id) }, 
        { $set: req.body }
      )
      .then(response => {
        if (response.modifiedCount) {
          res.statusCode = 204;
          res.json();
        } else {
          res.json({'error': 'no id found for update'});
        }
      });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/examples/:id", async (req, res) => {
  try {
    const db = req.db;
    db.collection("examples")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then(response => {
        console.log(response);
        if (response.deletedCount) {
          res.statusCode = 204;
          res.json();
        } else {
          res.json({'error': 'no id found for delete'});
        }
      });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
