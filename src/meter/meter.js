import MarshalByRefObject from '../angler/sources/websocket/remoting/MarshalByRefObject'
export default class extends MarshalByRefObject {
  constructor(object,source) {
    super(object._id);
    this.meterNO = object.meterNO;
    this.source = source;
  }

  read(item,callback){

  }
}
