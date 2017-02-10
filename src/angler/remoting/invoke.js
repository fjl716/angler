import mainboard from '../mainboard';

export default {
  invoke: async function (angler,msg) {
    angler.send(
      msg,
      {
        event: `remoting.result`,
        data: mainboard.apply(msg.data)
      },
      true
    );
  }
};
