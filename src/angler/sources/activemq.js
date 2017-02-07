import stompit from 'stompit';

class ActiveMQ {
  handleArrive(msg){
    console.log(msg);
  }
  constructor(connect,host){

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
export default ActiveMQ;
// let sendHeaders = {
//   'destination': `/queue/${msg.host}`,
//   'content-type': 'text/plain'
// };
//
// const connectMq = (connect)=> {
//   return new Promise(function (resolve, reject) {
//     stompit.connect(connect, (error, client) => {
//       if (error) {
//         console.log('connect error ' + error.message);
//         reject(error);
//       }
//       const subscribeHeaders = {
//         'destination': '/queue/MasterMQ',
//         'ack': 'client-individual'
//       };
//       client.subscribe(subscribeHeaders, (error, message) => {
//         if (error) {
//           console.log('subscribe error ' + error.message);
//           return;
//         }
//         message.readString('utf-8', function (error, body) {
//           if (error) {
//             console.log('read message error ' + error.message);
//             return;
//           }
//           console.log('received message: ' + body);
//           let msg = JSON.parse(body);
//           event.arrive(msg);
//           client.ack(message);
//           //client.disconnect();
//         });
//       });
//       resolve(client);
//     });
//   });
// };
