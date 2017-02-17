class ProxyServer {
  constructor(__ID__) {
    this.__ID__ = __ID__;
  }

  simple() {
    return {
      __ID__: this.__ID__,
      TYPE: this.constructor.name
    }
  }
}

export default ProxyServer
