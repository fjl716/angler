import util from 'util';

const base = Object.getPrototypeOf({});

class MarshalByRefObject {
  constructor() {
    this.id = `${Math.random()}`;
  }
}

function reflectFunction(obj,type,result) {
  for (let name of Object.getOwnPropertyNames(type)) {
    let method = obj[name];
    if (name != 'constructor' && util.isFunction(method)) {
      let args = method.toString().match(/function\s.*?\(([^)]*)\)/)[1];
      let params = args.split(",").map(function (arg) {
        // 去空格和内联注释
        return arg.replace(/\/\*.*\*\//, "").trim();
      }).filter(function (arg) {
        // 确保没有undefineds
        return arg;
      });
      result[name] = params;
    }
  }
}

export {
  MarshalByRefObject
};

const map = {};
const objectList = {};

export default {
  getObjects:()=>{
    return objectList;
  },
  createProxy: (obj) => {
    map[obj.id] = obj;
    let functions = {};
    let type = Object.getPrototypeOf(obj);
    while (type != base) {
      reflectFunction(obj, type, functions);
      type = Object.getPrototypeOf(type);
    }
    let object = {};
    Object.assign(object, obj);
    const result = {
      object,
      functions
    };
    objectList[obj.id] = result;
    return result;
  },
  callProxy: (proxyObj) => {
    console.log(proxyObj);
    const obj = map[proxyObj.id];
    return {
      callId:proxyObj.callId,
      data:obj[proxyObj.func].apply(obj,proxyObj.params)
    };
  }
};
