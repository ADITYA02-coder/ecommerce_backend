const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    category: String,
    brand: String,
    price: String,
    ram: Number,
    rom: Number,
    screenSize: String,
    camera: String,
    battery: String,
    processor: String,
    color: String,
    image: String,
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    availability: { type: Boolean, default: true },
    active: Boolean,
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
