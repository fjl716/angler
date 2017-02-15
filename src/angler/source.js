class Source {
  bind(angler,protocol) {
    this.angler = angler;
    this.protocol = protocol;
  }

  arrive(equipment, data) {
    this.angler.arrive(equipment, data);
  }

  out(equipment, packet) {
    this.angler.out(equipment, packet);
  }
}

export default Source
