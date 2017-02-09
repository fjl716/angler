import server from './server';
export default {
  invoke: async function (angler,msg) {
    angler.event.send(
      msg,
      {
        event: `remoting.set`,
        data: server.getObjects()
      },
      true
    );
  }
};
