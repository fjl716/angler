import server from './server';
export default {
  event: 'remoting',
  invoke: async function (angler, msg) {
    angler.send(
      msg,
      {
        event: `remoting.set`,
        data: server.getObjects()
      },
      true
    );
  },
  add(){

  }
};
