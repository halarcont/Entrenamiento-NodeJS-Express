module.exports = mongoose => {
  // Define el esquema del modelo Tutorial con tres campos: title, description y published
  let schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true } // Añade marcas de tiempo automáticas al documento (createdAt y updatedAt)
  );

  // Agrega un método toJSON al esquema para personalizar la serialización del objeto
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id; // Agrega el campo "id" al objeto serializado
    return object;
  });

  // Crea el modelo Tutorial utilizando el esquema definido y lo asigna a la constante Tutorial
  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial; // Devuelve el modelo Tutorial
};