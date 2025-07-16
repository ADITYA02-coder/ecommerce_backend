const db = require("../models");
const Question = db.questions;

// Create and Save a new Cat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({ message: "Question can not be empty!" });
    return;
  }

  // Create a Question
  const question = new Question({
    question: req.body.question,
    user: req.body.user,
    status: req.body.status ? req.body.status : false
  });

  // Save Question in the database
  question
    .save(question)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    });
};

// Retrieve all Questions from the database.
exports.findAll = (req, res) => {
  const name = req.query.question;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Question.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    });
};

// Find a single Cat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Question.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Cat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Cat with id=" + id });
    });
};

// Update a Cat by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cat with id=${id}. Maybe Cat was not found!`
        });
      } else res.send({ message: "Cat was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cat with id=" + id
      });
    });
};

// Delete a Cat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Question.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cat with id=${id}. Maybe Cat was not found!`
        });
      } else {
        res.send({
          message: "Cat was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cat with id=" + id
      });
    });
};

// Delete all Cat from the database.
exports.deleteAll = (req, res) => {
  Question.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Questions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Questions."
      });
    });
};

// Find all published Questions
exports.findAllActive = (req, res) => {
  Question.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    });
};
