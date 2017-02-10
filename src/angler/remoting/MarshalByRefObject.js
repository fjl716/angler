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

export default MarshalByRefObject
