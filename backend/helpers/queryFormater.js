const objectFormater = (obj, toPass) => {
  return typeof obj === "object" ? { ...obj, ...toPass } : toPass;
};

module.exports.queryFormater = (query) => {
  let queryBuilder = {};

  if (query["title"]) {
    queryBuilder["title"] = { $regex: query["title"] };
  }
  if (query["categories"]) {
    queryBuilder["categories"] = query["categories"];
  }

  if (query["maxPrice"]) {
    queryBuilder["price"] = objectFormater(queryBuilder["price"], {
      $lte: query["maxPrice"],
    });
  }
  if (query["minPrice"]) {
    queryBuilder["price"] = objectFormater(queryBuilder["price"], {
      $gte: query["minPrice"],
    });
  }
  return queryBuilder;
};
