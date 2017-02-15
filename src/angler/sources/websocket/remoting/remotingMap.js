const objectList = {};
const objects = {};

export default {
  getObjects(...ids){
    let result = [];
    ids.map(id=>{
      result.push(objects[id])
    });
    return result;
  },
  addObject: (...items) => {
    items.map(item=>{
      objectList[item.__ID__] = item;
      objects[item.__ID__] = item.simple();
    });
  },
  apply: (proxyObj) => {
    const obj = objectList[proxyObj.__ID__];
    return {
      __CALL_ID__:proxyObj.__CALL_ID__,
      data:obj[proxyObj.method].apply(obj,proxyObj.params)
    };
  }
};
