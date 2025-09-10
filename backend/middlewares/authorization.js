exports.authorizeAdmin = (req, res, next) => {
  try {
    if (req.type !== "admin")
      return res.status(401).json({
        status: "failed",
        message: "unauthorized",
      });
    next();
  } catch (error) {
    res.status(500).json({
      error: error || "Something went wrong",
    });
  }
};
exports.authorizeSecretary = (req, res, next) => {
  try {
    if (req.type !== "secretary")
      return res.status(401).json({
        status: "failed",
        message: "unauthorized",
      });
    next();
  } catch (error) {
    res.status(500).json({
      error: error || "Something went wrong",
    });
  }
};
exports.authorizeDetailer = (req, res, next) => {
  try {
    if (req.type !== "detailer")
      return res.status(401).json({
        status: "failed",
        message: "unauthorized",
      });
    next();
  } catch (error) {}
};
exports.authorizeUser = (req, res, next) => {
  try {
    if (req.type !== "User")
      return res.status(401).json({
        status: "failed",
        message: "unauthorized",
      });
    next();
  } catch (error) {}
};
