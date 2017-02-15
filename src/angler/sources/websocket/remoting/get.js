import remotingMap from './remotingMap';
export default {
  event: 'remoting',
  invoke: async function (angler, msg) {
    angler.send(
      msg,
      {
        event: `remoting.set`,
        data: remotingMap.getObjects(msg.data)
      },
      true
    );
  },
  add(){

  }
};
