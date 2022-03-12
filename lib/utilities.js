export const excludeKeys = (orgObj, keysArr) => {
  return Object.keys(orgObj)
    .filter((key) => !keysArr.includes(key))
    .reduce((obj, key) => {
      obj[key] = orgObj[key];
      return obj;
    }, {});
};
