import Emitter from 'pattern-emitter2';
const event = new Emitter();
import stompit from 'stompit';
let client = null;
import util from 'util';
import filter from './filter';
event.index = 1;

const connectMq = (connect)=> {
  return new Promise(function (resolve, reject) {
    stompit.connect(connect, (error, client) => {
      if (error) {
        console.log('connect error ' + error.message);
        reject(error);
      }
      const subscribeHeaders = {
        'destination': '/queue/MasterMQ',
        'ack': 'client-individual'
      };
      client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
          console.log('subscribe error ' + error.message);
          return;
        }
        message.readString('utf-8', function (error, body) {
          if (error) {
            console.log('read message error ' + error.message);
            return;
          }
          console.log('received message: ' + body);
          let msg = JSON.parse(body);
          event.arrive(msg);
          client.ack(message);
          //client.disconnect();
        });
      });
      resolve(client);
    });
  });
};

event.arrive = async (msg)=> {
  const tmp = {
    result: true,
    code:1
  };
  await filter.parse(msg.event, [tmp,msg]);
  if (tmp.result) {
    event.emit(msg.event, msg);
  }
};

event.addArray = (array) => {
  array.map(item => {
    event.on(item.event, item.invoke);
  })
};

event.addModel = (model,namespace)=> {
  for (let name in model) {
    let item = model[name];
    let eventName = item.event ? item.event : `${namespace}.${name}`;
    let code = event.index++;
    event.on(eventName, (...params) => {
      let oldMsg = params[0];
      let newMsg = params[1];
      newMsg.host = newMsg.host ? newMsg.host : oldMsg.host;
      newMsg.link = newMsg.link ? newMsg.link : oldMsg.link;
      newMsg.path = oldMsg.path.slice();
      params.splice(0, 1);
      if (newMsg.path.indexOf(code) == -1) {
        newMsg.path.push(code);
        item.invoke(...params);
      }
    });
  }
};

const mqSend = (msg,isout)=> {
  if (isout) {
    let sendHeaders = {
      'destination': `/queue/${msg.host}`,
      'content-type': 'text/plain'
    };
    let frame = client.send(sendHeaders);
    frame.write(JSON.stringify(msg));
    frame.end();
  }
};

event.send = (oldMsg,newMsg, isOut)=> {
  event.emit(newMsg.event, oldMsg, newMsg);
  //mqSend(msg, isOut);
};

event.init = async function(connect) {
  client = await connectMq(connect);
};

export default event;
