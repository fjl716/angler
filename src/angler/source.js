class Source {
  bind(angler) {
    this.angler = angler;
  }

  arrive(equipment, data) {
    this.angler.arrive(equipment, data);
  }

  out(equipment, packet) {
    this.angler.out(equipment, packet);
  }
}

export default Source