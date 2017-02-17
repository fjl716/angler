import proxys from '../../proxys';

export default {
  invoke: async function (angler,msg) {
    angler.send(
      msg,
      {
        event: `remoting.result`,
        data: proxys.apply(msg.data)
      },
      true
    );
  }
};
