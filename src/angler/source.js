import MainBoard from './mainboard'

class Source {
  link({container, protocol}) {
    this.container = container;
    this.protocol = protocol;
  }

  arrive(params) {
    this.container.arrive(params);
  }

  send(params) {
    this.container.out(params);
  }

  close(equipment) {
    equipment.offline();
    this.container.arrive({
      equipment,
      packet: this.protocol.packet(
        equipment, {
          event:'close'
        })
    });
    // equipment.channel = null;
    // MainBoard.remove(equipment);
  }
}

export default Source
