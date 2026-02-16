const LoginService = require("../../service/auth/loginService");

exports.login = async (req, res) => {
  const result = await LoginService.login(req.body);

  if (!result.success) {
    return res.status(401).json(result);
  }

  res.json(result);
};
