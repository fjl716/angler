import {ProxyServer} from '../../angler'
import dbs from '../../angler/dbs'

class TestServer extends ProxyServer {
  constructor(__ID__, base) {
    super(__ID__);
    this.base = base;
  }

  sum(a, b, c) {
    return a + b + c + this.base;
  }

  async find(){
    return dbs.mongo.collections['group'].findOne({});
  }
}

export default TestServer
