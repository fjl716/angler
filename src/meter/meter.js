import Equipment from '../angler/equipment'

class Meter extends Equipment {
  constructor(object,source) {
    super(object._id);
    this.meterNO = object.meterNO;
    this.source = source;
  }
}

export default Meter;
