import Equipment from '../angler/equipment'

class Meter extends Equipment {
  constructor(source, channel) {
    super(`${Math.random()}`.substr(2), source, channel);
  }
}

export default Meter;
