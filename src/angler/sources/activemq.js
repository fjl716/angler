import stompit from 'stompit';

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

export default {
  connect(){

  },
  send(){
    let frame = client.send(sendHeaders);
    frame.write(JSON.stringify(msg));
    frame.end();
  }
}
