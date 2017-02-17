const objects = {};

export default {
  getObjects(...ids){
    let result = [];
    ids.map(id => {
      result.push(objects[id].simple())
    });
    return result;
  },
  addObject: (...items) => {
    items.map(item => {
      objects[item.__ID__] = item;
    });
  },
  apply: (proxyObj) => {
    const obj = objects[proxyObj.__ID__];
    const result = obj[proxyObj.method].apply(obj, proxyObj.params);
    return {
      __CALL_ID__: proxyObj.__CALL_ID__,
      result: result
    };
  }
};
