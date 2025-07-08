module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: String,
      name: String,
      category: String,
      brand: String,
      price: String,
      ram: Number,
      rom: Number,
      screenSize: String,
      camera: String,
      image: String,
      active: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
