const equipments={};

export default {
  add(equipment, oldid) {
    if (oldid) {
      delete equipments[oldid];
    }
    equipments[equipment.__ID__] = equipment;
  },
  get(id){
    return equipments[id];
  },
  remove(equipment){
    delete equipments[equipment.__ID__]
  }
}
