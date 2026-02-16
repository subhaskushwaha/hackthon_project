const RegisterService = require("../../service/auth/registerService");

exports.register = async (req, res) => {
  const result = await RegisterService.register(req.body);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
};
