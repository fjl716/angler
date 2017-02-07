let callbackMap = {};

let proxyCall = (obj)=> {
  console.log(obj);
};

export default {
  setProxyCall: (call) => {
    proxyCall = call;
  },
  resultCallback:(result)=>{
    callbackMap[result.callId](result.data);
    delete callbackMap[result.callId];
  },
  createObject: (proxy) => {
    const result = {};
    Object.assign(result, proxy.object);
    for (let name in proxy.functions) {
      result[name] = function () {
        const proxy = {};
        proxy.id = result.id;
        proxy.func = name;
        proxy.params = [];
        for (let name in arguments) {
          proxy.params.push(arguments[name]);
        }
        let callback = proxy.params[proxy.params.length - 1];
        proxy.params.pop();
        proxy.callId = `${Math.random()}`;
        callbackMap[proxy.callId] = callback;
        proxyCall(proxy);
      }
    }
    return result;
  }
}
