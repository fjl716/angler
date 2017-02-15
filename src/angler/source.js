import MainBoard from './mainboard'

class Source {
  bind({angler,protocol}) {
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
    MainBoard.remove(equipment);
  }
}

export default Source
