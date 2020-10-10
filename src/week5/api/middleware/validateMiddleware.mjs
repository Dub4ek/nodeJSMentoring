export function validateMiddleware(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = !error;

    if (valid) {
      return next();
    }

    const { details } = error;
    const message = details.map(i => i.message).join(',');

    res.status(400).json({ error: message });
  };
}
