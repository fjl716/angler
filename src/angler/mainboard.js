const equipments={};

export default {
  add(equipment) {
    equipments[equipment.__ID__] = equipment;
    console.log(`add ${equipment.__ID__}`);
  },
  get(id){
    return equipments[id];
  },
  remove(equipment){
    console.log(`remove ${equipment.__ID__}`);
    delete equipments[equipment.__ID__]
  }
}
