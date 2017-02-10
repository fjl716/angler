class MarshalByRefObject {
  constructor() {
    this.__ID__ = `${Math.random()}`.substr(2);
  }

  simple() {
    return {
      __ID__: this.__ID__,
      TYPE: this.constructor.name
    }
  }
}

const objectList = {};
const simpleList = {};

export default {
  MarshalByRefObject,
  getObjects:()=> {
    return simpleList;
  },
  addObject: (...items) => {
    items.map(item=>{
      objectList[item.__ID__] = item;
      simpleList[item.__ID__] = item.simple();
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
