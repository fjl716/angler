import MainBoard from './mainboard'

class Source {
  bind(angler,protocol) {
    this.angler = angler;
    this.protocol = protocol;
  }

  arrive(equipment, packet) {
    this.angler.arrive(equipment, packet);
  }

  out(equipment, packet) {
    this.angler.out(equipment, packet);
  }

  close(equipment){
    MainBoard.remove(equipment);
  }
}

export default Source
