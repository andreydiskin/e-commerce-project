module.exports.queryFormater = (query) => {
    let queryBuilder = {};

    if (query["name"]) {
      queryBuilder["name"] = { $regex: query["name"] };
    }
    if (query["category"]) {
      queryBuilder["category"] = query["category"];
    }
    
    if (query["maxPrice"]) {
      queryBuilder["price"] = { $lte: query["maxPrice"] };
    }
    if (query["minPrice"]) {
      queryBuilder["price"] = { $gte: query["minPrice"] };
    }
   
    return queryBuilder;
  };
  