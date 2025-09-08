exports.sayHi = (req, res) => {
  res.status(200).json({
    status: "sucssess",
    data: "testing",
  });
};
