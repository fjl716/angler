import server from './server';

export default {
  invoke: async function (angler,msg) {
    angler.event.send(
      msg,
      {
        event: `remoting.result`,
        data: server.callProxy(msg.data)
      },
      true
    );
  }
};
