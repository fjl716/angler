import Channel from '../../channel'

class WebSocketChannel extends Channel{
  constructor(line){
    super();
    this.line = line;
    line.on('text', function(str){
      this.arrive(str);
      //source.arrive(this, str);
    }.bind(this));
    line.on('close', (code, reason) => {
      this.close();
      //source.arrive(this, Close);
    });
    line.on("error", (err) => {
    })
  }

  bind(equipment){
    this.equipment = equipment;
  }

  arrive(str){
    if (this.equipment){
      this.equipment.arrive(str);
    }
  }

  out(str){
    this.line.send(str);
  }

  close(){
    if (this.equipment){
      this.equipment.close();
    }
  }
}

export default WebSocketChannel
