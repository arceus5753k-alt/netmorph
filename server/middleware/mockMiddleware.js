const MockRule = require("../models/MockRule");

const mockMiddleware = async (req, res, next) => {
  try {
    const rule = await MockRule.findOne({ 
        endpoint : req.path,
        method : req.method,
        enabled : true,
     });
    if (!rule) {
      return next();
    }
    setTimeout(() => {
        res.status(200).json(rule.response);
    }, rule.delay || 0);
  } catch (error) {
    console.error("Error in mock middleware:", error);
    return next();
  }
};
module.exports = mockMiddleware;
