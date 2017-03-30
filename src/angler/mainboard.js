const equipments={};

export default {
  add(equipment) {
    equipments[equipment.__ID__] = equipment;
  },
  get(id){
    return equipments[id];
  },
  remove(equipment){
    const id = equipment.__ID__;
    // console.log(id);
    setTimeout(function () {
      // console.log('DELETE', id);
      delete equipments[id]
    }, 5000);
  }
}
