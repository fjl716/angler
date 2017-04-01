
import Container from './container'
import Channel from './channel'
import Equipment,{Close} from './equipment'
import Event from './event'
import MainBoard from './mainboard'
import Packet from './packet'
import proxys from './proxys';
import ProxyServer from './proxyserver'

import Source from './source'
import Task from './task'

import dbs from './dbs'
import watcher from './watcher'
import session from './session'


export {
  Close,
  Channel,
  Equipment,
  Event,
  MainBoard,
  Packet,
  ProxyServer,
  Source,
  Task,
  dbs,
  proxys,
  watcher,
  Container,
  session,
}

const system = {};
const startList = [];

export default {
  async load(model){
    const func = await model.init(system);
    if (func) {
      startList.push(func);
    }
  },
  async start(){
    for (let i = startList.length - 1; i >= 0; i--) {
      startList[i]();
    }
  }
}
