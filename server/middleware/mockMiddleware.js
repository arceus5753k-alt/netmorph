const MockRule = require("../models/MockRule");

// MATCH ROUTE
const matchRoute = (ruleEndpoint, reqPath) => {
  const ruleParts = ruleEndpoint.split("/");
  const reqParts = reqPath.split("/");

  if (ruleParts.length !== reqParts.length) return false;

  for (let i = 0; i < ruleParts.length; i++) {
    if (ruleParts[i].startsWith(":")) continue;
    if (ruleParts[i] !== reqParts[i]) return false;
  }

  return true;
};

// QUERY MATCH
const queryMatches = (ruleQuery, reqQuery) => {
  for (let key in ruleQuery) {
    if (String(ruleQuery[key]) !== String(reqQuery[key])) {
      return false;
    }
  }
  return true;
};

// EXTRACT PARAMS
const extractParams = (ruleEndpoint, reqPath) => {
  const params = {};
  const ruleParts = ruleEndpoint.split("/");
  const reqParts = reqPath.split("/");

  for (let i = 0; i < ruleParts.length; i++) {
    if (ruleParts[i].startsWith(":")) {
      const key = ruleParts[i].slice(1);
      params[key] = reqParts[i];
    }
  }

  return params;
};

// REPLACE PARAMS IN RESPONSE
const replaceParams = (response, params) => {
  if (typeof response === "string") {
    return response.replace(/:(\w+)/g, (_, key) => params[key] || "");
  }

  if (typeof response === "object" && response !== null) {
    const newObj = {};
    for (let key in response) {
      newObj[key] = replaceParams(response[key], params);
    }
    return newObj;
  }

  return response;
};

// MAIN MIDDLEWARE
const mockMiddleware = async (req, res, next) => {
  try {
    // 🔥 CHANGED: removed DB-level sorting
    const rules = await MockRule.find({
      method: req.method,
      enabled: true,
    });

    // 🔥 CHANGED: find → filter (collect ALL matches)
    const matchedRules = rules.filter((rule) => {
      return (
        matchRoute(rule.endpoint, req.path) &&
        queryMatches(rule.query || {}, req.query)
      );
    });

    // 🔥 NEW: if no match
    if (matchedRules.length === 0) return next();

    // 🔥🔥🔥 MAIN CHANGE: apply priority here
    matchedRules.sort((a, b) => b.priority - a.priority);

    // 🔥 NEW: pick best rule
    const matchedRule = matchedRules[0];

    // PARAM EXTRACTION + REPLACEMENT (same)
    const params = extractParams(matchedRule.endpoint, req.path);
    const finalResponse = replaceParams(matchedRule.response, params);

    setTimeout(() => {
      res
        .status(matchedRule.statusCode || 200)
        .json(finalResponse);
    }, matchedRule.delay || 0);

  } catch (error) {
    console.error("Error in mock middleware:", error);
    return next();
  }
};

module.exports = mockMiddleware;