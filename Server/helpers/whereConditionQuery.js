const isNotEmpty = require("./isNotEmpty.js");

function whereConditionQuery(objCond) {
  let containerQuery = [];
  for (const key in objCond) {
    const value = objCond[key];
    console.log(key);
    console.log(value);
    if (isNotEmpty(value)) {
      containerQuery.push(`${key} = '${value}'`);
    }
  }
  console.log(containerQuery);
  return `${containerQuery != "" ? " WHERE " : ""} ${containerQuery.join(
    " AND "
  )}`;
}

module.exports = whereConditionQuery;
