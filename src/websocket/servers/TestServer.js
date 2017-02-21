import {ProxyServer} from '../../angler'

class TestServer extends ProxyServer{
  constructor(__ID__,base){
    super(__ID__);
    this.base = base;
  }
   sum(a,b,c){
    return a + b + c + this.base;
  }

}

export default TestServer
