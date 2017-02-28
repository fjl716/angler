import Task from '../task'
import Drive from './drive'
import util from 'util'
import PByte from './type/byte';
import PChar from './type/char';
import PPackage from './type/package'
import PConst from './type/const'
import PCount from './type/count'
import PArray from './type/array'
import PCase from './type/case'
import Packet from '../packet'

export {
  Task,
  Drive,
}

const default_types = {
  b: (name) => new PByte(name),
  byte: (name) => new PByte(name),
  c: (name, count) => new PChar(name, count),
  char: (name, count) => new PChar(name, count),
};

class SlangPacket extends Packet{

}

export default class {
  constructor({types, parse}) {
    this.types = Object.assign({}, default_types);
    for (let typeName in types) {
      const block = types[typeName];
      if (util.isString(block)) {
        const sp = types[typeName].split(':');
        const innerCount = sp.length == 1 ? 1 : parseInt(sp[1]);
        this.types[typeName] = (name, count) => {
          return new PArray(name, [this.types[sp[0]](name, innerCount)], count);
        }
      } else {
        block.map(item => {

        })
      }
    }
    this.items = [];
    parse.map(item => {
      if (util.isString(item)) {
        this.items.push(new PConst(item));
      } else if (item.$count) {
        const count = item.$count;
        const name = Object.keys(item).find(name => name != '$count');
        const items = [];
        if (util.isString(item[name])) {
          const sp = item[name].split(':');
          const countInner = sp.length == 1 ? 1 : parseInt(sp[1]);
          this.items.push(new PCount(name, [this.types[sp[0]](name, countInner)], count));
        } else if (util.isArray(item[name])) {
          item[name].map(item => {
            const name = Object.keys(item)[0];
            const sp = item[name].split(':');
            const count = sp.length == 1 ? 1 : parseInt(sp[1]);
            items.push(this.types[sp[0]](name, count));
          });
          this.items.push(new PCount(name, items, count));
        }
      } else if (item.$case) {

      } else {
        const name = Object.keys(item)[0];
        const sp = item[name].split(':');
        const count = sp.length == 1 ? 1 : parseInt(sp[1]);
        this.items.push(this.types[sp[0]](name, count));
      }
    });
  }

  parse(buffer) {
    const result = {
      packet: []
    };
    let index = 0;
    let pack = new PPackage();
    pack.protocol = this;
    let i = 0;
    NO_PACK_BREAK:
      for (; i < this.items.length; i++) {
        index = this.items[i].parse(buffer, index, pack);
        switch (index) {
          case -1:
            break NO_PACK_BREAK;
          case -2:
            break NO_PACK_BREAK;
          default:
            break;
        }
      }
    if (i >= this.items.length) {
      result.packet(pack);
    }

    // console.log(pack.influx());
    //
    console.log(JSON.stringify(pack));
    return result;
  }
}
