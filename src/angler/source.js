import MainBoard from './mainboard'

class Source {
  link({angler, protocol}) {
    this.angler = angler;
    this.protocol = protocol;
  }

  arrive(params) {
    this.angler.arrive(params);
  }

  send(params) {
    this.angler.out(params);
  }

  close(equipment) {
    equipment.offline();
    this.angler.arrive({
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
