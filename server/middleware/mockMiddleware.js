const MockRule = require("../models/MockRule");

const mockMiddleware = async (req, res, next) => {
  try {
    const rules = await MockRule.find({
      method: req.method,
      enabled: true,
    });

    const queryMatches =(ruleQuery, reqQuery)=>{
      for(let key in ruleQuery) {
        if(ruleQuery[key] != reqQuery[key]) {
          return false;
        }
      }
      return true;
    }


    const matchedRule = rules.find((rule) => {
      const r = rule.endpoint.split("/");
      const p = req.path.split("/");

      if (p.length != r.length) {
        return false;
      }
      for (let i = 0; i < r.length; i++) {
        if (r[i].startsWith(":")) {
          continue;
        }
        if (r[i] !== p[i]) {
          return false;
        }
      }
      return queryMatches(rule.query || {} , req.query);
    });

    if (!matchedRule) return next();

    setTimeout(() => {
      res.status(matchedRule.statusCode || 200).json(matchedRule.response);
    }, matchedRule.delay || 0);
  } catch (error) {
    console.error("Error in mock middleware:", error);
    return next();
  }
};
module.exports = mockMiddleware;
