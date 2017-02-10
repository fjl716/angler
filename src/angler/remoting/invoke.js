import server from './server';

export default {
  invoke: async function (angler,msg) {
    angler.send(
      msg,
      {
        event: `remoting.result`,
        data: server.apply(msg.data)
      },
      true
    );
  }
};
