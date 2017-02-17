import MainBoard from './mainboard'

class Source {
  link({angler,protocol}) {
    this.angler = angler;
    this.protocol = protocol;
  }

  arrive(params) {
    this.angler.arrive(params);
  }

  send(params) {
    this.angler.out(params);
  }

  close(equipment){
    // equipment.channel = null;
    equipment.offline();
    // MainBoard.remove(equipment);
  }
}

export default Source
