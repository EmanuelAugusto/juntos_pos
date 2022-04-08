const Validate = (schema, values) => {
  for (let field in schema) {
    if (schema[field].required) {
      if (!values[field]) {
        return { valid: false, msg: schema[field].msg };
      }
    }
  }
  return { valid: true, msg: null };
};

export default Validate;
