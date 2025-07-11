const db = require("../models");
const Product = db.products;
const fs = require("fs");
  //C:\Users\Administrator\AngularNodeExpressMySQL\node-js-server\resources\static\assets
  //C:\Users\Administrator\AngularNodeExpressMySQL\node-js-server\app\resources\static\assets\uploads\
  global.__basedir = __dirname;
// Create and Save a new Product
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({ message: "Product Name can not be empty!" });
//     return;
//   }

//   // Create a Product
//   const product = new Product({
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     brand: req.body.brand,
//     ram: req.body.ram,
//     rom: req.body.rom,
//     screenSize: req.body.screenSize,
//     camera: req.body.camera,
//     image: req.body.image,
//     active: req.body.active ? req.body.active : false
//   });

//   // Save Product in the database
//   product
//     .save(product)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Product."
//       });
//     });
// };



// Create and Save a new User
exports.create = (req, res) => {
  console.log("Hello Aman")
    try {
      console.log(req.file);
  
      if (req.file === undefined) {
        return res.send(`You must select a file.`);
        console.log("You must select a file.");
      }
  
      Product.create({
        
        name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    brand: req.body.brand,
    ram: req.body.ram,
    rom: req.body.rom,
    screenSize: req.body.screenSize,
    camera: req.body.camera,
    active: req.body.active ? req.body.active : false,
    
    image: req.file.filename,
        
        
      }).then(data => {
            return res.send(data);
            console.log(data)
            return res.send(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Product.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    });
};

// Find all published Products
exports.findAllActive = (req, res) => {
  Product.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};
