import Emitter from 'pattern-emitter2';

class Probe {
  constructor({container, equipment, packet}, event) {
    this.packet = packet;
    this.results = [];
    this.database = container.database;
    this.session = container.session;
    this.event = event;
    this.equipment = equipment.__ID__;
  }

  send({event, equipment=this.equipment, data},isOut=false) {
    if (event){
      const result = this.event.result.find(result => result.event === event);
      if (result) {
        this.results.push(Object.assign({},
          {equipment},
          result,
          {data,isOut},
        ))
      }
    }else{
      this.event.result.map(result => {
        this.results.push(Object.assign({},
          {equipment},
          result,
          {data,isOut},
        ))
      });
    }
  }
}

class Event {
  constructor(container) {
    this.event = new Emitter();
    this.container = container;
    this.index = 1;
  }

  clear(){
    this.event.removeAllListeners();
  }

  add(event) {
    const code = this.index++;
    this.event.on(event.event, async (obj, ...params) => {
      console.log(1);
      const {equipment,packet} = obj;
      const probe = new Probe(obj, event);
      await event.invoke(probe, ...params);
      if (probe.changeId){
        this.container.change(equipment, probe.changeId);
      }
      probe.results.map(result=>{
        this.container.send(packet,result);
      });
    });
  }

  async arrive({equipment, packet}) {
    this.event.emit(packet.getKey(), {
      container: this.container,
      equipment,
      packet
    });
  }
}

export default Event;
