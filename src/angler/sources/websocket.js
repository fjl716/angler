import ws from 'nodejs-websocket';

class WebSocket {
  handleArrive(msg){
    console.log(msg);
  }
  constructor(port) {
    this.clientMap = {};
    let self = this;
    ws.createServer((conn) => {
      conn.link = `${Math.random()}`.substr(2);
      self.clientMap[conn.link] = conn;
      conn.on('text', function (str) {
        const msg = JSON.parse(str);
        Object.assign(msg, {link: conn.link});
        self.handleArrive(msg);
      });
      conn.on('close', function (code, reason) {
        delete self.clientMap[conn.link];
        self.handleArrive({
          event: 'close',
          link: conn.link,
        });
        console.log(self.clientMap);
      })
    }).listen(port);
  }

  onDataArrive(arrive) {
    this.handleArrive = arrive;
  }

  send(msg) {
    const client = this.clientMap[msg.link];
    if (client) {
      const sendObj = {
        event: msg.event,
        data: msg.data
      };
      client.sendText(JSON.stringify(sendObj));
    }
  }
}

export default WebSocket;
