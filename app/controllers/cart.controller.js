const db = require("../models");
const Cart = db.carts;

// Create or update Cart (add items)
exports.create = async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  if (!userId || !productId || !quantity || !price) {
    return res.status(400).send({ message: "Missing required fields." });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price }],
        active: true
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price });
      }
    }

    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error creating/updating cart."
    });
  }
};

// Retrieve all carts
exports.findAll = (req, res) => {
  Cart.find()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts."
      });
    });
};

// Find a single cart by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findById(id)
    .then(data => {
      if (!data) res.status(404).send({ message: `Cart not found with id=${id}` });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving cart with id=" + id });
    });
};

// Update a cart
exports.update = (req, res) => {
  const id = req.params.id;

  Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot update cart with id=${id}. Not found!` });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating cart with id=" + id });
    });
};

// Delete a cart
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete cart with id=${id}. Not found!` });
      } else {
        res.send({ message: "Cart was deleted successfully!" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete cart with id=" + id });
    });
};

// Delete all carts
exports.deleteAll = (req, res) => {
  Cart.deleteMany({})
    .then(data => {
      res.send({ message: `${data.deletedCount} carts deleted.` });
    })
    .catch(err => {
      res.status(500).send({ message: "Error deleting all carts." });
    });
};

// Find all active carts
exports.findAllActive = (req, res) => {
  Cart.find({ active: true })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: "Error retrieving active carts." });
    });
};
