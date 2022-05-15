const signup = async (req, res) => {
  await res.send({
    message: `Hello ${req.body.firstName} ${req.body.lastName}, your email is ${req.body.email} and your password is ${req.body.password}`,
  });
};

module.exports = { signup };
