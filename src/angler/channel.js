class Channel{
  bind({equipment}){
    this.equipment = equipment;
  }

  arrive(str){
    if (this.equipment){
      this.equipment.arrive(str);
    }
  }

  close(){
    if (this.equipment){
      this.equipment.close();
    }
  }

}

export default Channel;
