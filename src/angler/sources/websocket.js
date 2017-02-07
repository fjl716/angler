import ws from 'nodejs-websocket';

class WebSocket {
  constructor(port) {
    this.clientMap = {};
    let self = this;
    this.handleArrive = (msg) => {
      //console.log(msg);
    };
    ws.createServer((conn) => {
      conn.id = `${Math.random()}`.substr(2);
      self.clientMap[conn.id] = conn;
      conn.on('text', function (str) {
        const msg = JSON.parse(str);
        Object.assign(msg, {id: conn.id});
        self.handleArrive(msg);
      });
      conn.on('close', function (code, reason) {
        delete self.clientMap[conn.id];
      })
    }).listen(port);
  }

  onDataArrive(arrive) {
    this.handleArrive = arrive;
  }

  send(msg) {
    const client = this.clientMap[msg.id];
    console.log(msg);
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
