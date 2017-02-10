import mainboard from '../mainboard';
export default {
  event: 'remoting',
  invoke: async function (angler, msg) {
    angler.send(
      msg,
      {
        event: `remoting.set`,
        data: mainboard.getObjects(msg.data)
      },
      true
    );
  },
  add(){

  }
};
