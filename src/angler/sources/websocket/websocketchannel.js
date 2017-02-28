import Channel from '../../channel'

class WebSocketChannel extends Channel{
  constructor(line){
    super();
    this.line = line;
    line.on('message', function(str) {
      this.arrive(str);
    }.bind(this));
    //
    // line.on('text', function(str){
    //   this.arrive(str);
    // }.bind(this));
    // line.on('close', (code, reason) => {
    //   this.close();
    // });
    // line.on("error", (err) => {
    // })
  }

  out(str){
    this.line.send(str);
  }

}

export default WebSocketChannel
