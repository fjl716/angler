import Channel from '../../channel'

class WebSocketChannel extends Channel{
  constructor(line){
    super();
    this.line = line;
    line.on('message', function(str) {
      this.arrive(str);
    }.bind(this));
  }

  out(str){
    this.line.send(str);
  }

}

export default WebSocketChannel
