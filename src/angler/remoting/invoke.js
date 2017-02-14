import remotingMap from './remotingMap';

export default {
  invoke: async function (angler,msg) {
    angler.send(
      msg,
      {
        event: `remoting.result`,
        data: remotingMap.apply(msg.data)
      },
      true
    );
  }
};
